<script setup lang="ts">
/** Encabezado de sección: filete dorado, antetítulo, título en serif y bajada. */
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    titleEm?: string
    description?: string
    align?: 'left' | 'center'
    /** Corta el ancho de la bajada para que no se estire en pantallas anchas. */
    narrow?: boolean
    /**
     * Nivel del encabezado. Por defecto `h2` porque casi siempre es una sección
     * dentro de una página; el primer encabezado de cada vista pasa `1` para que
     * la página tenga su `h1` y el orden de lectura sea correcto.
     */
    level?: 1 | 2 | 3
  }>(),
  { align: 'left', narrow: true, level: 2 },
)
</script>

<template>
  <div :class="align === 'center' ? 'text-center' : ''">
    <div
      class="flex items-center gap-3"
      :class="align === 'center' ? 'justify-center' : ''"
    >
      <span
        class="block h-px w-8"
        style="background: linear-gradient(90deg, transparent, var(--accent))"
      />
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    </div>

    <component
      :is="`h${level}`"
      class="mt-5 text-balance"
      :class="level === 1 ? 'display-lg' : 'display-md'"
      style="color: var(--foreground)"
    >
      {{ title }}
      <em v-if="titleEm" class="serif-em">{{ titleEm }}</em>
    </component>

    <p
      v-if="description"
      class="mt-6 text-base font-light leading-relaxed text-pretty"
      :class="[narrow ? 'max-w-xl' : '', align === 'center' ? 'mx-auto' : '']"
      style="color: var(--muted-foreground)"
    >
      {{ description }}
    </p>
  </div>
</template>
