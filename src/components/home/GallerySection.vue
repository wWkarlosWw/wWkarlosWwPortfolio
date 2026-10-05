<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import { gallery } from '@/data/gallery'
import { useLocalized } from '@/composables/useT'

/**
 * "Fuera del código": un recorrido horizontal por fotos personales.
 *
 * La sección se queda fija y el scroll vertical desplaza la fila de fotos hacia
 * la izquierda, igual en escritorio que en móvil; cada foto se mueve un poco
 * más lento que su marco, lo que da profundidad. Solo con menos movimiento es
 * una fila normal con desplazamiento lateral y ajuste por foto.
 */
const { t } = useI18n()
const { L } = useLocalized()

const section = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const pinned = ref(false)
const height = ref<string>('auto')
const progress = ref(0)

let distance = 0
let ticking = false

function measure() {
  if (!pinned.value || !track.value) {
    height.value = 'auto'
    return
  }
  distance = Math.max(0, track.value.scrollWidth - window.innerWidth)
  height.value = `${distance + window.innerHeight}px`
  update()
}

function update() {
  ticking = false
  if (!pinned.value || !section.value || !track.value) return

  const top = section.value.getBoundingClientRect().top
  const p = distance > 0 ? Math.min(1, Math.max(0, -top / distance)) : 0
  progress.value = p
  track.value.style.transform = `translate3d(${-p * distance}px, 0, 0)`

  // Paralaje interior: la foto se desplaza contra el sentido de su marco.
  const vw = window.innerWidth
  track.value.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
    const frame = img.parentElement!.getBoundingClientRect()
    const fromCenter = (frame.left + frame.width / 2 - vw / 2) / vw
    img.style.transform = `translate3d(${fromCenter * -12}%, 0, 0) scale(1.25)`
  })
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

onMounted(() => {
  pinned.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  nextTick(measure)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measure, { passive: true })
  // Las fotos cambian el ancho de la fila al cargar.
  track.value?.querySelectorAll('img').forEach((img) => img.addEventListener('load', measure, { once: true }))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <section
    id="gallery"
    ref="section"
    class="tone-dark relative"
    :style="{ height }"
    :aria-label="t('gallery.label')"
  >
    <div
      class="overflow-hidden"
      :class="pinned ? 'sticky top-0 flex h-[100svh] items-center' : 'section-pad'"
    >
      <!-- Palabra gigante de fondo: avanza más lento que las fotos -->
      <p
        class="pointer-events-none absolute left-0 top-1/2 whitespace-nowrap font-display italic leading-none select-none"
        style="font-size: clamp(8rem, 22vw, 20rem); color: var(--foreground); opacity: 0.04"
        :style="{ transform: `translate3d(${-progress * 30}%, -50%, 0)` }"
        aria-hidden="true"
      >
        {{ t('gallery.backdrop') }}
      </p>

      <div
        ref="track"
        class="relative flex items-center gap-8 px-6 will-change-transform lg:gap-14 lg:px-[8vw]"
        :class="pinned ? '' : 'snap-x snap-mandatory scroll-px-6 overflow-x-auto pb-6'"
      >
        <!-- Presentación -->
        <div class="w-[78vw] shrink-0 snap-start sm:w-[24rem] lg:w-[30rem]">
          <p class="eyebrow">{{ t('gallery.label') }}</p>
          <h2 class="title display-md mt-4 text-balance">
            <span class="title-sans">{{ t('gallery.title') }}</span>
            <span class="title-serif">{{ t('gallery.titleEm') }}</span>
          </h2>
          <p class="mt-6 max-w-sm text-base leading-relaxed text-pretty" style="color: var(--muted-foreground)">
            {{ t('gallery.description') }}
          </p>
          <p
            v-if="pinned"
            class="mt-10 flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase"
            style="color: var(--muted-foreground)"
          >
            {{ t('gallery.hint') }}
            <ArrowRight :size="13" style="color: var(--accent)" />
          </p>
        </div>

        <!-- Fotos -->
        <figure
          v-for="(photo, i) in gallery"
          :key="photo.src"
          class="group relative w-[72vw] shrink-0 snap-center sm:w-[20rem] lg:w-[min(24vw,calc(58svh*0.75))]"
          :class="i % 2 ? 'lg:translate-y-14' : 'lg:-translate-y-8'"
          data-cursor="Karlos"
        >
          <div class="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)]" style="background: var(--muted)">
            <img
              :src="photo.src"
              :alt="L(photo.alt)"
              loading="lazy"
              data-parallax
              class="h-full w-full object-cover transition-[filter] duration-700 group-hover:saturate-[1.1]"
              style="transform: scale(1.25); filter: saturate(0.85)"
            />
            <div
              class="absolute inset-0 transition-opacity duration-700 group-hover:opacity-60"
              style="background: linear-gradient(180deg, transparent 55%, rgba(13, 26, 20, 0.7))"
            />
            <span
              class="absolute left-4 top-4 text-[0.6rem] tracking-[0.25em] uppercase"
              style="color: rgba(245, 241, 232, 0.85)"
            >
              {{ L(photo.place) }}
            </span>
            <span class="numeric absolute bottom-3 right-4 text-4xl leading-none" style="color: var(--gold-400)">
              0{{ i + 1 }}
            </span>
          </div>
          <figcaption
            class="mt-4 font-display text-lg leading-snug text-pretty italic"
            style="color: var(--muted-foreground)"
          >
            {{ L(photo.caption) }}
          </figcaption>
        </figure>

        <!-- Cierre -->
        <div class="flex w-[60vw] shrink-0 snap-start flex-col items-start gap-6 sm:w-[18rem] lg:w-[22rem]">
          <span class="gold-rule w-24" />
          <p class="font-display text-3xl leading-snug" style="color: var(--foreground)">
            {{ t('gallery.outro') }}
          </p>
          <RouterLink v-magnetic :to="{ name: 'about' }" class="btn btn-outline">
            {{ t('gallery.cta') }}
            <ArrowRight :size="14" />
          </RouterLink>
        </div>

        <!-- Margen final para que el cierre no quede pegado al borde -->
        <div class="w-[4vw] shrink-0" aria-hidden="true" />
      </div>

      <!-- Avance del recorrido -->
      <div
        v-if="pinned"
        class="absolute bottom-10 left-[8vw] right-[8vw] h-px"
        style="background: var(--border)"
        aria-hidden="true"
      >
        <div class="h-px origin-left" style="background: var(--accent)" :style="{ transform: `scaleX(${progress})` }" />
      </div>
    </div>
  </section>
</template>
