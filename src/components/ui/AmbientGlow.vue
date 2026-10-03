<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import woodTexture from '@/assets/img/navMadera.jpg'
import forestTexture from '@/assets/img/bosqueTextura.jpg'
import leavesTexture from '@/assets/img/hojasVerdes.jpg'

/**
 * Ambiente de fondo de las secciones.
 *
 * No es el mismo dibujo con los colores cambiados: en oscuro manda la madera
 * del bosque de noche, y en claro las hojas verdes del claro del día.
 *
 * Las texturas entran como detalle de esquina con máscara de degradado, no
 * como fondo a pantalla completa: extendidas se leían como una mancha, y
 * enmascaradas se leen como lo que son, un adorno botánico.
 */
const props = withDefaults(
  defineProps<{
    /** `full` para cabeceras a pantalla completa; `soft` es un velo discreto. */
    variant?: 'full' | 'soft'
    /** Cuánto se nota, de 0 a 1. */
    intensity?: number
  }>(),
  { variant: 'soft', intensity: 1 },
)

const theme = useThemeStore()

/** En oscuro manda la madera; en claro, las hojas. */
const texture = computed(() => (theme.isDark ? woodTexture : leavesTexture))

const cornerOpacity = computed(() => {
  const base = theme.isDark ? 0.22 : 0.28
  return base * (props.variant === 'full' ? 1.3 : 1) * props.intensity
})

/** Máscara radial: la textura solo existe cerca de la esquina. */
function cornerMask(corner: 'tr' | 'bl') {
  const at = corner === 'tr' ? '100% 0%' : '0% 100%'
  return {
    maskImage: `radial-gradient(62% 62% at ${at}, #000 0%, rgba(0,0,0,0.55) 42%, transparent 78%)`,
    WebkitMaskImage: `radial-gradient(62% 62% at ${at}, #000 0%, rgba(0,0,0,0.55) 42%, transparent 78%)`,
  }
}
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- Fotografía de bosque de fondo, solo en cabeceras grandes -->
    <img
      v-if="variant === 'full'"
      :src="forestTexture"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      :style="{
        opacity: (theme.isDark ? 0.24 : 0.18) * intensity,
        filter: theme.isDark ? 'saturate(0.8)' : 'saturate(1.15)',
      }"
    />

    <!-- Detalle superior derecho -->
    <div
      class="absolute -right-16 -top-24 h-[26rem] w-[30rem] bg-cover bg-center"
      :style="{
        backgroundImage: `url(${texture})`,
        opacity: cornerOpacity,
        mixBlendMode: theme.isDark ? 'overlay' : 'multiply',
        transform: 'rotate(6deg)',
        ...cornerMask('tr'),
      }"
    />

    <!-- Detalle inferior izquierdo, espejado para que no se repita el patrón -->
    <div
      class="absolute -bottom-28 -left-20 h-[24rem] w-[28rem] bg-cover bg-center"
      :style="{
        backgroundImage: `url(${texture})`,
        opacity: cornerOpacity * 0.8,
        mixBlendMode: theme.isDark ? 'overlay' : 'multiply',
        transform: 'rotate(-8deg) scaleX(-1)',
        ...cornerMask('bl'),
      }"
    />

    <!-- Calidez dorada arriba -->
    <div
      class="absolute inset-0"
      :style="{
        background: theme.isDark
          ? 'radial-gradient(60% 42% at 22% 0%, rgba(232, 198, 91, 0.10), transparent 70%)'
          : 'radial-gradient(60% 42% at 22% 0%, rgba(212, 175, 55, 0.16), transparent 70%)',
        opacity: intensity,
      }"
    />

    <!-- Verde suave subiendo desde abajo -->
    <div
      class="absolute inset-x-0 bottom-0 h-1/2"
      :style="{
        background: theme.isDark
          ? 'linear-gradient(to top, rgba(61, 122, 95, 0.12), transparent)'
          : 'linear-gradient(to top, rgba(42, 90, 73, 0.07), transparent)',
        opacity: intensity,
      }"
    />

    <!-- Velo central: garantiza el contraste del texto que va encima -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(66% 55% at 42% 45%, color-mix(in srgb, var(--background) 72%, transparent), transparent 78%)"
    />
  </div>
</template>
