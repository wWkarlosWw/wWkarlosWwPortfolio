<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Banda de texto que corre sin fin entre secciones.
 *
 * Avanza sola, pero el scroll le da impulso: al bajar rápido acelera y se
 * inclina un poco, y al soltar vuelve a su ritmo. Cambia de sentido según
 * hacia dónde se desplace la página. Se detiene fuera de pantalla.
 */
const props = withDefaults(
  defineProps<{
    items: string[]
    /** Píxeles por cuadro en reposo. */
    speed?: number
    reverse?: boolean
  }>(),
  { speed: 0.6, reverse: false },
)

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

let offset = 0
let velocity = 0
let direction = props.reverse ? 1 : -1
let lastScroll = 0
let raf = 0
let running = false
let observer: IntersectionObserver | undefined

function onScroll() {
  const delta = window.scrollY - lastScroll
  lastScroll = window.scrollY
  velocity = Math.max(-30, Math.min(30, velocity + delta * 0.12))
  if (delta !== 0) direction = (delta > 0 ? -1 : 1) * (props.reverse ? -1 : 1)
}

function tick() {
  const el = track.value
  if (!el) return

  velocity *= 0.9
  offset += direction * (props.speed + Math.abs(velocity))

  // El contenido va duplicado: al recorrer la mitad, se vuelve al inicio sin salto.
  const half = el.scrollWidth / 2
  if (half > 0) {
    if (offset <= -half) offset += half
    if (offset > 0) offset -= half
  }

  const skew = Math.max(-8, Math.min(8, velocity * 0.4))
  el.style.transform = `translate3d(${offset}px, 0, 0) skewX(${skew}deg)`
  if (running) raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  lastScroll = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })

  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting && !running) {
      running = true
      raf = requestAnimationFrame(tick)
    } else if (!entry?.isIntersecting) {
      running = false
      cancelAnimationFrame(raf)
    }
  })
  if (root.value) observer.observe(root.value)
})

onUnmounted(() => {
  running = false
  cancelAnimationFrame(raf)
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    ref="root"
    class="tone-forest relative overflow-hidden py-8 sm:py-10"
    aria-hidden="true"
  >
    <div ref="track" class="flex w-max items-center whitespace-nowrap will-change-transform">
      <template v-for="copy in 2" :key="copy">
        <span v-for="(item, i) in items" :key="`${copy}-${i}`" class="flex items-center">
          <span
            class="px-6 font-display text-5xl leading-none sm:px-10 sm:text-7xl lg:text-8xl"
            :class="i % 2 ? 'serif-em' : ''"
            :style="i % 2 ? undefined : { color: 'transparent', WebkitTextStroke: '1.5px var(--foreground)', opacity: 0.7 }"
          >
            {{ item }}
          </span>
          <!-- Punto dorado entre palabras -->
          <span class="size-2 shrink-0 rounded-full sm:size-2.5" style="background: var(--accent)" />
        </span>
      </template>
    </div>
  </div>
</template>
