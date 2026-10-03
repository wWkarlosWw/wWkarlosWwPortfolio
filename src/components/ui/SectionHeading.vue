<script setup lang="ts">
/**
 * Encabezado de sección en dos voces: antetítulo, una línea en sans gruesa,
 * otra en serif y la bajada. Es el mismo en todo el sitio, así cada sección
 * se reconoce como parte de la misma familia.
 */
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    titleEm?: string
    description?: string
    align?: 'left' | 'center'
    /**
     * Nivel del encabezado. Por defecto `h2` porque casi siempre es una sección
     * dentro de una página; el primer encabezado de cada vista pasa `1` para que
     * la página tenga su `h1` y el orden de lectura sea correcto.
     */
    level?: 1 | 2 | 3
  }>(),
  { align: 'left', level: 2 },
)
</script>

<template>
  <div :class="align === 'center' ? 'flex flex-col items-center text-center' : ''">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>

    <component
      :is="`h${level}`"
      class="title mt-4 text-balance"
      :class="[level === 1 ? 'display-lg' : 'display-md', align === 'center' ? 'items-center' : '']"
    >
      <span class="title-sans">{{ title.replace(/[,.]$/, '') }}</span>
      <span v-if="titleEm" class="title-serif">{{ titleEm }}</span>
    </component>

    <p v-if="description" class="lead mt-6 max-w-xl text-pretty">
      {{ description }}
    </p>
  </div>
</template>
