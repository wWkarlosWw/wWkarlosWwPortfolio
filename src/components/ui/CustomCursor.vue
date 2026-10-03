<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Anillo dorado que sigue al cursor con un poco de retraso, como una luciérnaga.
 *
 * No reemplaza la flecha del sistema: la acompaña. Sobre enlaces y botones se
 * abre, y sobre cualquier elemento con `data-cursor="Texto"` muestra esa
 * palabra dentro ("Ver", "Abrir"...). Solo existe con ratón y movimiento
 * permitido; en táctil no se monta nada.
 */
const enabled = ref(false)
const visible = ref(false)
const hovering = ref(false)
const label = ref('')
const ring = ref<HTMLDivElement | null>(null)

let x = 0
let y = 0
let rx = 0
let ry = 0
let raf = 0

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]'

function onMove(e: PointerEvent) {
  x = e.clientX
  y = e.clientY
  if (!visible.value) {
    rx = x
    ry = y
    visible.value = true
  }
}

function onOver(e: PointerEvent) {
  const target = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE)
  hovering.value = !!target
  label.value = target?.dataset.cursor ?? ''
}

function onLeaveWindow() {
  visible.value = false
}

function tick() {
  // Interpolación: el anillo recorre un 18 % de la distancia en cada cuadro.
  rx += (x - rx) * 0.18
  ry += (y - ry) * 0.18
  if (ring.value) ring.value.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!finePointer || reducedMotion) return

  enabled.value = true
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerover', onOver, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeaveWindow)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerover', onOver)
  document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
})
</script>

<template>
  <div
    v-if="enabled"
    ref="ring"
    class="pointer-events-none fixed left-0 top-0 z-[70]"
    aria-hidden="true"
  >
    <div
      class="cursor-ring flex items-center justify-center rounded-full"
      :class="{ 'is-hover': hovering, 'has-label': label, 'is-hidden': !visible }"
    >
      <span class="cursor-label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.cursor-ring {
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border: 1px solid color-mix(in srgb, var(--accent) 70%, transparent);
  transition:
    width 0.5s var(--ease-out-soft),
    height 0.5s var(--ease-out-soft),
    margin 0.5s var(--ease-out-soft),
    background-color 0.5s var(--ease-out-soft),
    border-color 0.5s var(--ease-out-soft),
    opacity 0.3s ease;
}

.cursor-ring.is-hover {
  width: 58px;
  height: 58px;
  margin: -29px 0 0 -29px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-color: var(--accent);
}

.cursor-ring.has-label {
  width: 86px;
  height: 86px;
  margin: -43px 0 0 -43px;
  background: var(--accent);
}

.cursor-ring.is-hidden {
  opacity: 0;
}

.cursor-label {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--on-accent);
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity 0.3s ease,
    transform 0.5s var(--ease-out-soft);
}

.has-label .cursor-label {
  opacity: 1;
  transform: none;
}
</style>
