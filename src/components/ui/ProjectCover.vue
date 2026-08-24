<script setup lang="ts">
import { computed } from 'vue'

/**
 * Portada generada para cada proyecto.
 *
 * En lugar de fotos de banco sin relación con el trabajo, cada tarjeta dibuja
 * su propia escena de bosque: dosel de hojas, troncos y luz filtrada. La
 * composición se deriva del `slug`, así que un proyecto siempre se ve igual,
 * pero dos proyectos nunca se ven iguales entre sí.
 */
const props = withDefaults(
  defineProps<{
    slug: string
    title: string
    kind: 'personal' | 'freelance' | 'work'
    /** Formato: `wide` para tarjetas, `tall` para el detalle. */
    ratio?: 'wide' | 'tall'
  }>(),
  { ratio: 'wide' },
)

/** Hash estable de cadena a entero de 32 bits. */
function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** PRNG determinista: la misma semilla da siempre la misma escena. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Cada tipo de proyecto tiene su propio tinte dentro de la misma familia. */
const KIND_TINT: Record<'personal' | 'freelance' | 'work', { a: string; b: string }> = {
  work: { a: '#1c4535', b: '#0d1a14' },
  freelance: { a: '#2a5a49', b: '#12241c' },
  personal: { a: '#3d7a5f', b: '#152b22' },
}

const scene = computed(() => {
  const rand = mulberry32(hash(props.slug))
  const tint = KIND_TINT[props.kind]

  // Troncos: posición y grosor variables, siempre verticales.
  const trunks = Array.from({ length: 3 + Math.floor(rand() * 3) }, () => ({
    x: 4 + rand() * 92,
    w: 1.2 + rand() * 3.4,
    o: 0.1 + rand() * 0.22,
    lean: (rand() - 0.5) * 5,
  }))

  // Hojas del dosel, distribuidas hacia la parte alta del encuadre.
  const leaves = Array.from({ length: 9 + Math.floor(rand() * 6) }, () => ({
    x: rand() * 100,
    y: rand() * 62,
    s: 0.28 + rand() * 0.62,
    r: rand() * 360,
    o: 0.14 + rand() * 0.38,
  }))

  // Arcos del dosel superior.
  const canopy = Array.from({ length: 3 }, (_, i) => ({
    cy: -18 + i * 9 + rand() * 8,
    rx: 62 + rand() * 40,
    ry: 26 + rand() * 16,
    cx: 12 + rand() * 76,
    o: 0.3 - i * 0.07,
  }))

  return { tint, trunks, leaves, canopy }
})

const initials = computed(() =>
  props.title
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join(''),
)

const viewBox = computed(() => (props.ratio === 'tall' ? '0 0 100 130' : '0 0 100 62'))
const gid = computed(() => `pc-${hash(props.slug).toString(36)}`)
</script>

<template>
  <div
    class="relative h-full w-full overflow-hidden"
    :class="ratio === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/5]'"
  >
    <svg
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid slice"
      class="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <!-- Fondo: verde profundo en oscuro, crema y verde suave en claro -->
        <linearGradient :id="`${gid}-bg`" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" :stop-color="scene.tint.a" />
          <stop offset="100%" :stop-color="scene.tint.b" />
        </linearGradient>

        <!-- Luz que cae desde la esquina superior -->
        <radialGradient :id="`${gid}-light`" cx="0.24" cy="0.02" r="0.9">
          <stop offset="0%" stop-color="#e8c65b" stop-opacity="0.34" />
          <stop offset="45%" stop-color="#e8c65b" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#e8c65b" stop-opacity="0" />
        </radialGradient>

        <!-- Viñeta que hunde los bordes para que el texto respire -->
        <linearGradient :id="`${gid}-veil`" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" :stop-color="scene.tint.b" stop-opacity="0.92" />
          <stop offset="55%" :stop-color="scene.tint.b" stop-opacity="0.25" />
          <stop offset="100%" :stop-color="scene.tint.b" stop-opacity="0" />
        </linearGradient>

        <!-- Hoja reutilizable -->
        <g :id="`${gid}-leaf`">
          <path
            d="M0 6 C 4 0.4, 14 -0.6, 22 6 C 14 12.6, 4 11.6, 0 6 Z"
            fill="currentColor"
          />
          <path d="M1 6 L 21 6" stroke="currentColor" stroke-width="0.4" opacity="0.55" />
        </g>
      </defs>

      <rect x="0" y="0" width="100" height="130" :fill="`url(#${gid}-bg)`" />

      <!-- Troncos al fondo -->
      <g>
        <rect
          v-for="(t, i) in scene.trunks"
          :key="`t${i}`"
          :x="t.x"
          y="-5"
          :width="t.w"
          height="140"
          fill="#0d1a14"
          :opacity="t.o"
          :transform="`rotate(${t.lean} ${t.x} 60)`"
        />
      </g>

      <!-- Dosel -->
      <g fill="#0d1a14">
        <ellipse
          v-for="(c, i) in scene.canopy"
          :key="`c${i}`"
          :cx="c.cx"
          :cy="c.cy"
          :rx="c.rx"
          :ry="c.ry"
          :opacity="c.o"
        />
      </g>

      <!-- Hojas sueltas en dorado -->
      <g color="#e8c65b">
        <use
          v-for="(l, i) in scene.leaves"
          :key="`l${i}`"
          :href="`#${gid}-leaf`"
          :opacity="l.o"
          :transform="`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`"
        />
      </g>

      <rect x="0" y="0" width="100" height="130" :fill="`url(#${gid}-light)`" />
      <rect x="0" y="0" width="100" height="130" :fill="`url(#${gid}-veil)`" />
    </svg>

    <!-- Iniciales grabadas, apenas visibles: dan identidad sin gritar -->
    <div class="pointer-events-none absolute inset-0 flex items-end justify-end p-5">
      <span
        class="font-display leading-none select-none"
        :class="ratio === 'tall' ? 'text-[7rem]' : 'text-[4.5rem]'"
        style="
          color: transparent;
          -webkit-text-stroke: 1px rgba(232, 198, 91, 0.35);
        "
      >
        {{ initials }}
      </span>
    </div>

    <slot />
  </div>
</template>
