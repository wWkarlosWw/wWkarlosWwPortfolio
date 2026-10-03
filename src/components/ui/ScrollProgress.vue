<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/** Hilo dorado en el borde superior que crece con el recorrido de la página. */
const bar = ref<HTMLDivElement | null>(null)
let ticking = false

function update() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const progress = max > 0 ? window.scrollY / max : 0
  if (bar.value) bar.value.style.transform = `scaleX(${progress})`
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px]" aria-hidden="true">
    <div
      ref="bar"
      class="h-full origin-left"
      style="
        transform: scaleX(0);
        background: linear-gradient(90deg, var(--gold-600), var(--gold-400), var(--gold-500));
        box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 60%, transparent);
      "
    />
  </div>
</template>
