<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

/**
 * Cifra que cuenta desde cero la primera vez que entra en pantalla.
 * Acepta texto como "4+" o "12": anima el número y respeta lo que lo rodea.
 */
const props = withDefaults(defineProps<{ value: string; duration?: number }>(), { duration: 1600 })

const parts = computed(() => {
  const match = props.value.match(/^(\D*)(\d+)(.*)$/)
  return match
    ? { before: match[1], target: Number(match[2]), after: match[3] }
    : { before: props.value, target: 0, after: '' }
})

const el = ref<HTMLElement | null>(null)
const current = ref(0)
let raf = 0
let observer: IntersectionObserver | undefined

function run() {
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min((now - start) / props.duration, 1)
    current.value = Math.round((1 - Math.pow(1 - t, 4)) * parts.value.target)
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !el.value) {
    current.value = parts.value.target
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer?.disconnect()
      run()
    },
    { threshold: 0.5 },
  )
  observer.observe(el.value)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<template>
  <span ref="el">
    <span class="sr-only">{{ value }}</span>
    <span aria-hidden="true">{{ parts.before }}{{ current }}{{ parts.after }}</span>
  </span>
</template>
