<script setup lang="ts">
import { computed } from 'vue'
import { projectShot } from '@/data/projectShots'

/**
 * Portada ancha de un proyecto, para su página.
 *
 * Si el proyecto tiene captura (ver `data/projectShots.ts`) se usa esa.
 * Mientras no exista, la portada es tipográfica: el nombre en serif sobre
 * tinta, con una luz verde muy suave. Sin dibujos inventados.
 */
const props = defineProps<{ slug: string; title: string }>()

const image = computed(() => projectShot(props.slug))
</script>

<template>
  <div class="relative aspect-[16/9] w-full overflow-hidden" style="background: var(--ink)">
    <img v-if="image" :src="image" :alt="title" class="absolute inset-0 h-full w-full object-cover object-top" />

    <div v-else class="absolute inset-0 flex items-center justify-center p-8" aria-hidden="true">
      <div
        class="absolute -left-1/4 -top-1/3 h-[90%] w-[80%] rounded-full blur-3xl"
        style="background: radial-gradient(circle, rgba(58, 122, 93, 0.45), transparent 65%)"
      />
      <p class="relative text-center font-display text-6xl leading-none text-balance sm:text-8xl" style="color: var(--cream)">
        {{ title }}
      </p>
    </div>
  </div>
</template>
