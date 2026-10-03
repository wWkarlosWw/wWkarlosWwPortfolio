<script setup lang="ts">
/**
 * Luz ambiental de una sección: dos manchas de color muy difusas que derivan
 * despacio. No dibujan nada reconocible; solo dan profundidad y algo que las
 * tarjetas de vidrio puedan desenfocar.
 *
 * En papel apenas se notan; en noche y bosque son las que hacen visible el
 * vidrio esmerilado.
 */
withDefaults(
  defineProps<{
    tone?: 'light' | 'dark' | 'forest'
    /** Cuánto se nota, de 0 a 1. */
    intensity?: number
  }>(),
  { tone: 'light', intensity: 1 },
)
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
      class="glow glow-a"
      :style="{
        opacity: intensity,
        background:
          tone === 'light'
            ? 'radial-gradient(circle, rgba(39, 92, 70, 0.10), transparent 65%)'
            : 'radial-gradient(circle, rgba(58, 122, 93, 0.55), transparent 65%)',
      }"
    />
    <div
      class="glow glow-b"
      :style="{
        opacity: intensity,
        background:
          tone === 'light'
            ? 'radial-gradient(circle, rgba(168, 128, 31, 0.07), transparent 65%)'
            : 'radial-gradient(circle, rgba(226, 192, 99, 0.2), transparent 65%)',
      }"
    />
  </div>
</template>

<style scoped>
.glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(60px);
  will-change: transform;
}

.glow-a {
  left: -12%;
  top: -18%;
  width: 60%;
  height: 75%;
  animation: drift-a 22s ease-in-out infinite alternate;
}

.glow-b {
  right: -10%;
  bottom: -22%;
  width: 50%;
  height: 70%;
  animation: drift-b 26s ease-in-out infinite alternate;
}

@keyframes drift-a {
  to { transform: translate3d(18%, 14%, 0) scale(1.1); }
}

@keyframes drift-b {
  to { transform: translate3d(-16%, -12%, 0) scale(1.15); }
}
</style>
