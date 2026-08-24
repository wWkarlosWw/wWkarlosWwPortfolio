<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

/**
 * Lluvia sobre un estanque, para la sección de contacto.
 *
 * Tres capas: una cortina de lluvia en profundidad, una cascada tenue al
 * costado y las ondas que se abren donde cada gota toca el agua. Todo en un
 * único canvas.
 *
 * La animación se detiene sola cuando la sección sale de la pantalla, y no
 * llega a arrancar si el sistema pide menos movimiento.
 */
const props = withDefaults(defineProps<{ density?: number }>(), { density: 1 })

const canvas = ref<HTMLCanvasElement | null>(null)
const theme = useThemeStore()

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let running = false
let width = 0
let height = 0
let dpr = 1

interface Drop {
  x: number
  y: number
  len: number
  speed: number
  /** 0 = lejos y difuso, 1 = cerca y nítido. */
  depth: number
}

interface Ripple {
  x: number
  y: number
  r: number
  max: number
  life: number
}

let drops: Drop[] = []
let ripples: Ripple[] = []

/** Línea de agua: fracción de la altura donde empieza el estanque. */
const WATER_LINE = 0.82
/** Inclinación de la lluvia, en píxeles de x por cada píxel de y. */
const SLANT = 0.18

function palette() {
  return theme.isDark
    ? { rain: '232, 198, 91', ripple: '232, 198, 91', fall: '155, 190, 170' }
    : { rain: '42, 90, 73', ripple: '28, 69, 53', fall: '61, 122, 95' }
}

function makeDrop(seedTop = false): Drop {
  const depth = Math.random()
  return {
    x: Math.random() * (width + height * SLANT) - height * SLANT,
    y: seedTop ? Math.random() * height : -Math.random() * 120,
    len: 8 + depth * 26,
    speed: 2.4 + depth * 7.5,
    depth,
  }
}

function resize() {
  const el = canvas.value
  if (!el) return

  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = el.getBoundingClientRect()
  width = rect.width
  height = rect.height

  el.width = Math.round(width * dpr)
  el.height = Math.round(height * dpr)

  ctx = el.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

  // La cantidad de gotas escala con el área para que la lluvia se vea igual
  // de densa en un móvil que en un monitor ancho.
  const count = Math.round((width * height) / 9000) * props.density
  drops = Array.from({ length: Math.min(Math.max(count, 30), 260) }, () => makeDrop(true))
}

function frame() {
  if (!ctx || !running) return

  const p = palette()
  const waterY = height * WATER_LINE

  ctx.clearRect(0, 0, width, height)

  // --- Cascada: velo vertical continuo al costado derecho ---
  const fallX = width * 0.86
  const fallW = width * 0.1
  const grad = ctx.createLinearGradient(fallX, 0, fallX, waterY)
  grad.addColorStop(0, `rgba(${p.fall}, 0)`)
  grad.addColorStop(0.35, `rgba(${p.fall}, 0.07)`)
  grad.addColorStop(1, `rgba(${p.fall}, 0.02)`)
  ctx.fillStyle = grad
  ctx.fillRect(fallX, 0, fallW, waterY)

  // --- Lluvia ---
  ctx.lineCap = 'round'
  for (const d of drops) {
    ctx.beginPath()
    ctx.strokeStyle = `rgba(${p.rain}, ${0.08 + d.depth * 0.3})`
    ctx.lineWidth = 0.4 + d.depth * 1.1
    ctx.moveTo(d.x, d.y)
    ctx.lineTo(d.x + d.len * SLANT, d.y + d.len)
    ctx.stroke()

    d.x += d.speed * SLANT
    d.y += d.speed

    if (d.y > waterY) {
      // Solo las gotas del primer plano dejan onda: si no, el agua se satura.
      if (d.depth > 0.55 && ripples.length < 26) {
        ripples.push({
          x: d.x,
          y: waterY + Math.random() * (height - waterY) * 0.7,
          r: 0,
          max: 6 + d.depth * 22,
          life: 1,
        })
      }
      Object.assign(d, makeDrop())
    }
  }

  // --- Ondas en el agua ---
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i]
    if (!r) continue

    r.r += 0.55
    r.life = 1 - r.r / r.max

    if (r.life <= 0) {
      ripples.splice(i, 1)
      continue
    }

    ctx.beginPath()
    ctx.strokeStyle = `rgba(${p.ripple}, ${r.life * 0.32})`
    ctx.lineWidth = 0.8
    // Elipse achatada: sugiere una superficie vista en perspectiva.
    ctx.ellipse(r.x, r.y, r.r, r.r * 0.3, 0, 0, Math.PI * 2)
    ctx.stroke()
  }

  // --- Brillo del estanque ---
  const pond = ctx.createLinearGradient(0, waterY, 0, height)
  pond.addColorStop(0, `rgba(${p.ripple}, 0.05)`)
  pond.addColorStop(1, `rgba(${p.ripple}, 0)`)
  ctx.fillStyle = pond
  ctx.fillRect(0, waterY, width, height - waterY)

  raf = requestAnimationFrame(frame)
}

function start() {
  if (running) return
  running = true
  raf = requestAnimationFrame(frame)
}

function stop() {
  running = false
  cancelAnimationFrame(raf)
}

let observer: IntersectionObserver | null = null
let mql: MediaQueryList | null = null

onMounted(() => {
  mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mql.matches) return

  resize()
  window.addEventListener('resize', resize, { passive: true })

  // Solo animar mientras la sección esté a la vista.
  observer = new IntersectionObserver(
    ([entry]) => (entry?.isIntersecting ? start() : stop()),
    { threshold: 0 },
  )
  if (canvas.value) observer.observe(canvas.value)

  // Y tampoco si la pestaña está en segundo plano.
  document.addEventListener('visibilitychange', onVisibility)
})

function onVisibility() {
  if (document.hidden) stop()
  else if (observer) start()
}

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', onVisibility)
})

// Al cambiar de tema, la paleta se recalcula en el siguiente frame sola.
watch(() => theme.isDark, () => { if (!running && !mql?.matches) start() })
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>
