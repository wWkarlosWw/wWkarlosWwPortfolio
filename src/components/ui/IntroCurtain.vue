<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import WkLogoIcon from './WkLogoIcon.vue'

/**
 * Telón de entrada: el logo se dibuja, un contador llega a 100 y el telón sube
 * para descubrir el héroe.
 *
 * Solo aparece en la primera visita de la sesión: volver al inicio no debería
 * costar otra espera. Mientras está en pantalla deja `--intro-delay` en el
 * `<html>` para que las animaciones del héroe arranquen cuando sube el telón y
 * no detrás de él.
 */
const DURATION = 1500
const LIFT = 900
const STORAGE_KEY = 'intro-seen'

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const show = ref(!reducedMotion && !alreadySeen())
const lifting = ref(false)
const count = ref(0)

const root = document.documentElement
if (show.value) root.style.setProperty('--intro-delay', `${DURATION}ms`)

let raf = 0
let liftTimer: number | undefined
let doneTimer: number | undefined

onMounted(() => {
  if (!show.value) return

  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* sin almacenamiento la intro simplemente se repetirá */
  }

  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min((now - start) / (DURATION - 150), 1)
    // Desacelera al final, como algo que se detiene con calma.
    count.value = Math.round((1 - Math.pow(1 - t, 3)) * 100)
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)

  liftTimer = window.setTimeout(() => (lifting.value = true), DURATION)
  doneTimer = window.setTimeout(() => {
    show.value = false
    root.style.removeProperty('--intro-delay')
  }, DURATION + LIFT)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.clearTimeout(liftTimer)
  window.clearTimeout(doneTimer)
  root.style.removeProperty('--intro-delay')
})
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[80] flex items-center justify-center"
    :style="{
      background: 'var(--forest-900)',
      animation: lifting ? `curtain-lift ${LIFT}ms var(--ease-in-out-soft) forwards` : undefined,
    }"
    aria-hidden="true"
  >
    <div class="flex flex-col items-center gap-6">
      <div class="w-24 sm:w-28" style="color: var(--gold-400); animation: logo-draw 1.1s var(--ease-out-soft) both">
        <WkLogoIcon />
      </div>
      <span class="gold-rule w-40" />
      <p class="text-[0.62rem] tracking-[0.45em] uppercase" style="color: rgba(245, 241, 232, 0.6)">
        Karlos Batista
      </p>
    </div>

    <p class="numeric absolute bottom-8 right-8 text-6xl leading-none sm:text-8xl" style="color: var(--gold-400)">
      {{ count }}
    </p>
  </div>
</template>
