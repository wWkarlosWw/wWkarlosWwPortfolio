<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, ArrowDown, Download } from '@lucide/vue'
import { profile } from '@/data/profile'
import portrait from '@/assets/img/hero-photo.jpg'
import hiddenPhoto from '@/assets/img/hero-reveal.jpg'

/**
 * Héroe en dos tiempos, a la manera de landonorris.com.
 *
 * Primero, la foto a pantalla completa. Al bajar, la escena se queda fija y
 * el lienzo entero se encoge hasta ser una tarjeta (se escala, no se recorta:
 * el encuadre se mantiene),
 * la página pasa a negro y por detrás cruzan dos líneas de texto gigante.
 * Al final aparecen la presentación y las llamadas a la acción.
 *
 * Con ratón, el cursor deja un rastro orgánico que descubre otra foto debajo;
 * el rastro se encoge solo. Si nadie mueve el cursor, la tinta se pasea sola
 * por la foto hasta que detecta movimiento. Solo vive arriba del todo: en cuanto se empieza a
 * bajar, el rastro y el paralaje del cursor se apagan.
 *
 * Todo cuelga de un único avance `p` (0 → 1) calculado con el scroll; los
 * estilos se escriben directo en el DOM para no re-renderizar a 60 fps. Con
 * menos movimiento la escena no se fija y queda el primer tiempo, estático.
 */
const { t } = useI18n()

const section = ref<HTMLElement | null>(null)
const frame = ref<HTMLElement | null>(null)
const figureEl = ref<HTMLImageElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const lineTop = ref<HTMLElement | null>(null)
const lineBottom = ref<HTMLElement | null>(null)
const outro = ref<HTMLElement | null>(null)
const hint = ref<HTMLElement | null>(null)

const pinned = ref(true)
/** La página pasa a noche en cuanto la tarjeta empieza a recogerse. */
const dark = ref(false)

/* --- Utilidades de interpolación --------------------------------------- */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
/** Avance local de un tramo [a, b] del recorrido. */
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)

/* --- Escena ---------------------------------------------------------------- */
let mx = 0
let my = 0
let ticking = false
/** El cursor solo actúa con la escena en reposo, antes de empezar a bajar. */
let mouseActive = true

function schedule() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(render)
}

function render() {
  ticking = false
  const el = section.value
  if (!el || !frame.value) return

  const vw = window.innerWidth
  const vh = window.innerHeight
  const travel = el.offsetHeight - vh
  const p = pinned.value && travel > 0 ? clamp(-el.getBoundingClientRect().top / travel) : 0

  // 1 · El lienzo entero se encoge hasta ser una tarjeta, un poco por encima del centro.
  const shrink = easeInOut(span(p, 0.05, 0.6))
  const target = vw < 768 ? 0.82 : 0.56
  const scale = 1 - shrink * (1 - target)
  const lift = -vh * 0.07 * shrink
  frame.value.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`
  // El radio se compensa con la escala para que en pantalla mida siempre lo mismo.
  frame.value.style.borderRadius = `${(28 * shrink) / scale}px`

  dark.value = shrink > 0.2

  const wasActive = mouseActive
  mouseActive = p < 0.02
  if (wasActive && !mouseActive) {
    // Al empezar a bajar, el rastro se recoge y la foto vuelve a su sitio.
    mx = 0
    my = 0
    cursor = null
    last = null
    wakeTrail()
  } else if (!wasActive && mouseActive) {
    // De vuelta arriba: la tinta vuelve a pasearse sola.
    lastMove = 0
    wakeTrail()
  }

  if (figureEl.value) {
    figureEl.value.style.translate = `${mx * -10}px ${my * -6}px`
  }

  // 2 · El indicador de scroll se retira en cuanto se empieza a bajar.
  if (hint.value) {
    hint.value.style.opacity = `${1 - span(p, 0, 0.12)}`
    hint.value.style.visibility = p > 0.12 ? 'hidden' : ''
  }

  // 3 · Dos líneas gigantes cruzan por detrás de la tarjeta.
  const lines = span(p, 0.15, 0.45)
  const drift = p * 38
  if (lineTop.value) {
    lineTop.value.style.opacity = `${lines}`
    lineTop.value.style.transform = `translate3d(${-drift}%, 0, 0)`
  }
  if (lineBottom.value) {
    lineBottom.value.style.opacity = `${lines}`
    lineBottom.value.style.transform = `translate3d(${drift - 38}%, 0, 0)`
  }

  // 4 · Presentación y llamadas a la acción.
  const end = easeOut(span(p, 0.6, 0.85))
  if (outro.value) {
    outro.value.style.opacity = `${end}`
    outro.value.style.transform = `translate3d(0, ${(1 - end) * 40}px, 0)`
    outro.value.style.pointerEvents = end > 0.6 ? 'auto' : 'none'
  }
}

/* --- Rastro: el cursor descubre la segunda foto ---------------------------
 *
 * Se pintan círculos sólidos en un lienzo-máscara a lo largo del recorrido
 * del cursor; cada uno nace grande y se encoge hasta desaparecer. Al juntarse
 * forman manchas orgánicas. Luego la foto se dibuja solo donde hay máscara.
 * Las coordenadas son las del lienzo sin escalar, así el efecto es el mismo
 * con la escena a pantalla completa o recogida en tarjeta.
 */
interface Blob {
  x: number
  y: number
  r: number
  life: number
}

let ctx: CanvasRenderingContext2D | null = null
let mask: HTMLCanvasElement | null = null
let mctx: CanvasRenderingContext2D | null = null
let photo: HTMLImageElement | null = null
let blobs: Blob[] = []
let last: { x: number; y: number } | null = null
let cursor: { x: number; y: number } | null = null
let trailRaf = 0
let trailEnabled = false
let dpr = 1

function sizeCanvas() {
  const c = canvas.value
  if (!c || !mask) return
  dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  c.width = mask.width = Math.round(c.clientWidth * dpr)
  c.height = mask.height = Math.round(c.clientHeight * dpr)
}

/** Posición del cursor en coordenadas del lienzo sin escalar, o `null` si está fuera. */
function toLocal(clientX: number, clientY: number) {
  const f = frame.value
  if (!f) return null
  const rect = f.getBoundingClientRect()
  if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null
  const k = f.offsetWidth / rect.width
  return { x: (clientX - rect.left) * k, y: (clientY - rect.top) * k }
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !mouseActive) return
  mx = (e.clientX / window.innerWidth) * 2 - 1
  my = (e.clientY / window.innerHeight) * 2 - 1
  schedule()

  if (!trailEnabled) return
  // El cursor manda: la tinta deja de pasearse sola en cuanto se mueve.
  lastMove = performance.now()
  if (roaming) {
    roaming = false
    last = null
  }

  cursor = toLocal(e.clientX, e.clientY)
  if (!cursor) {
    last = null
    wakeTrail()
    return
  }

  seed(last ?? cursor, cursor)
  last = cursor
  wakeTrail()
}

/** Siembra círculos cada pocos píxeles entre dos puntos; cuanto más lejos, más grandes. */
function seed(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dist = Math.hypot(to.x - from.x, to.y - from.y)
  const steps = Math.max(1, Math.ceil(dist / 10))
  const r = 70 + Math.min(dist, 120) * 0.6
  for (let i = 1; i <= steps; i++) {
    const k = i / steps
    blobs.push({ x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k, r, life: 1 })
  }
  if (blobs.length > 400) blobs = blobs.slice(-400)
}

/*
 * Paseo: mientras nadie mueve el cursor, la tinta recorre la foto sola en una
 * curva lenta, para que se vea que ahí debajo hay algo. Al primer movimiento
 * del ratón se detiene, y vuelve tras unos segundos de quietud.
 */
const IDLE_MS = 2500
let lastMove = 0
let roaming = false

function roam(time: number) {
  const c = canvas.value
  if (!c) return
  const t = time / 1000
  const point = {
    x: c.clientWidth * (0.5 + 0.34 * Math.sin(t * 0.55)),
    y: c.clientHeight * (0.46 + 0.26 * Math.sin(t * 0.9 + 1.2)),
  }
  // Al arrancar, o tras una pausa larga (pestaña en segundo plano), empieza
  // desde el punto actual en vez de trazar una línea hasta él.
  if (!roaming || !last || Math.hypot(point.x - last.x, point.y - last.y) > 160) {
    roaming = true
    cursor = null
    last = point
  }
  seed(last ?? point, point)
  last = point
}

function onPointerLeave() {
  cursor = null
  last = null
  wakeTrail()
}

function wakeTrail() {
  if (!trailRaf) trailRaf = requestAnimationFrame(drawTrail)
}

function drawTrail(time: number) {
  trailRaf = 0
  const c = canvas.value
  if (!ctx || !mctx || !mask || !c || !photo?.complete) return

  const w = mask.width
  const h = mask.height
  mctx.setTransform(1, 0, 0, 1, 0, 0)
  mctx.clearRect(0, 0, w, h)
  mctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  mctx.fillStyle = '#000'

  const idle = mouseActive && time - lastMove > IDLE_MS
  if (idle) roam(time)

  // Mientras el cursor está dentro, un círculo lo acompaña aunque esté quieto.
  if (cursor) {
    mctx.beginPath()
    mctx.arc(cursor.x, cursor.y, 64 + Math.sin(time / 500) * 4, 0, Math.PI * 2)
    mctx.fill()
  }

  for (const b of blobs) {
    b.life -= 0.022
    if (b.life <= 0) continue
    mctx.beginPath()
    mctx.arc(b.x, b.y, b.r * easeOut(b.life), 0, Math.PI * 2)
    mctx.fill()
  }
  blobs = blobs.filter((b) => b.life > 0)

  // La foto solo aparece donde la máscara tiene tinta.
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'source-over'
  ctx.drawImage(mask, 0, 0)
  ctx.globalCompositeOperation = 'source-in'
  drawCover(ctx, photo, w, h, 0.55, 0.35)
  ctx.globalCompositeOperation = 'source-over'

  if (blobs.length || cursor || mouseActive) trailRaf = requestAnimationFrame(drawTrail)
}

/** `object-fit: cover` con `object-position` en un canvas. */
function drawCover(g: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, px: number, py: number) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight)
  const dw = img.naturalWidth * s
  const dh = img.naturalHeight * s
  g.drawImage(img, (w - dw) * px, (h - dh) * py, dw, dh)
}

onMounted(() => {
  pinned.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  trailEnabled = pinned.value && window.matchMedia('(hover: hover) and (pointer: fine)').matches

  if (trailEnabled && canvas.value) {
    ctx = canvas.value.getContext('2d')
    mask = document.createElement('canvas')
    mctx = mask.getContext('2d')
    photo = new Image()
    photo.onload = wakeTrail
    photo.src = hiddenPhoto
    sizeCanvas()
    window.addEventListener('resize', sizeCanvas, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
  }

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  if (pinned.value) window.addEventListener('pointermove', onPointerMove, { passive: true })
  render()
})

onUnmounted(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  window.removeEventListener('resize', sizeCanvas)
  window.removeEventListener('pointermove', onPointerMove)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  cancelAnimationFrame(trailRaf)
})

function scrollToNext() {
  document.getElementById('snapshot')?.scrollIntoView({ behavior: 'smooth' })
}

/** Entrada que espera al telón de la intro si lo hay. */
function enter(delay: number, duration = 0.9) {
  return `fade-up ${duration}s var(--ease-out-soft) calc(var(--intro-delay, 0ms) + ${delay}s) both`
}
</script>

<template>
  <section
    id="hero"
    ref="section"
    class="relative transition-colors duration-700"
    :class="[pinned ? 'h-[260svh]' : 'h-[100svh]', dark ? 'tone-dark' : 'tone-light']"
    :aria-label="t('hero.portraitAlt')"
  >
    <div class="sticky top-0 h-[100svh] overflow-hidden">
      <!-- ============ Líneas gigantes (detrás de la tarjeta) ============ -->
      <div class="absolute inset-x-0 top-0 flex h-[86%] flex-col justify-center gap-2 select-none" aria-hidden="true">
        <p ref="lineTop" class="hero-line font-display italic" style="color: var(--em); opacity: 0">
          {{ t('hero.marqueeTop') }} · {{ t('hero.marqueeTop') }} ·
        </p>
        <p
          ref="lineBottom"
          class="hero-line font-sans font-extrabold uppercase tracking-tight"
          style="color: var(--foreground); opacity: 0"
        >
          {{ t('hero.marqueeBottom') }} · {{ t('hero.marqueeBottom') }} ·
        </p>
      </div>

      <!-- ============ Lienzo: pantalla completa que se encoge a tarjeta ============ -->
      <div ref="frame" class="hero-canvas absolute inset-0 origin-center overflow-hidden will-change-transform">
        <img
          ref="figureEl"
          :src="portrait"
          :alt="t('hero.portraitAlt')"
          width="1798"
          height="3198"
          class="absolute inset-0 h-full w-full scale-[1.03] object-cover object-[50%_36%] will-change-transform"
          fetchpriority="high"
        />

        <!-- Rastro del cursor: dibuja la segunda foto solo donde pasa el ratón -->
        <canvas ref="canvas" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
      </div>

      <!-- Indicador de scroll -->
      <div ref="hint" class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <button
          class="flex cursor-pointer items-center gap-3 rounded-full border py-1.5 pl-5 pr-1.5 transition-colors duration-300 hover:text-[color:var(--forest-600)]"
          style="color: var(--ink); border-color: rgba(11, 12, 11, 0.15); background: rgba(255, 255, 255, 0.55); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px)"
          :style="{ animation: enter(0.4) }"
          :aria-label="t('common.scroll')"
          @click="scrollToNext"
        >
          <span class="text-[0.6rem] font-semibold tracking-[0.3em] uppercase">{{ t('common.scroll') }}</span>
          <span class="flex size-9 items-center justify-center rounded-full" style="background: var(--ink); color: var(--paper)">
            <ArrowDown :size="14" class="animate-bounce" />
          </span>
        </button>
      </div>

      <!-- ============ Segundo tiempo: presentación ============ -->
      <div
        ref="outro"
        class="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-[4svh] text-center"
        style="opacity: 0"
      >
        <h1 class="max-w-2xl font-display text-3xl leading-tight text-balance sm:text-4xl" style="color: var(--foreground)">
          {{ t('hero.tagline') }} <em class="serif-em">{{ t('hero.taglineEm') }}</em>
        </h1>
        <p
          class="mt-3 hidden max-w-lg text-sm leading-relaxed text-pretty md:block"
          style="color: var(--muted-foreground)"
        >
          {{ t('hero.description') }}
        </p>
        <div class="mt-5 flex flex-wrap justify-center gap-3">
          <RouterLink v-magnetic :to="{ name: 'projects' }" class="btn btn-primary">
            {{ t('hero.ctaProjects') }}
            <ArrowRight :size="14" />
          </RouterLink>
          <RouterLink v-magnetic :to="{ name: 'contact' }" class="btn btn-outline">
            {{ t('hero.ctaContact') }}
          </RouterLink>
          <a v-magnetic :href="profile.cv" download class="btn btn-outline hidden sm:inline-flex" style="border-color: transparent">
            <Download :size="14" />
            {{ t('common.downloadCv') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Color de espera mientras carga la foto */
.hero-canvas {
  background: #d9d8d2;
}

.hero-line {
  white-space: nowrap;
  font-size: clamp(4rem, 12vw, 11rem);
  line-height: 0.95;
  will-change: transform, opacity;
}
</style>
