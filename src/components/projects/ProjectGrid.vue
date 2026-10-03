<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Project } from '@/data/types'
import ProjectTile from './ProjectTile.vue'

/**
 * Vitrina de proyectos: columnas escalonadas, una sí y otra no más abajo.
 *
 * Las fichas se reparten en columnas reales (no en una rejilla de filas) para
 * que el escalonado no deje huecos. El número de columnas sigue al ancho de
 * la ventana: una en móvil, dos en tableta y cuatro en escritorio.
 */
const props = defineProps<{ projects: Project[] }>()

const columnCount = ref(4)

function measure() {
  const w = window.innerWidth
  columnCount.value = w < 640 ? 1 : w < 1024 ? 2 : 4
}

const columns = computed(() => {
  const cols: Project[][] = Array.from({ length: columnCount.value }, () => [])
  props.projects.forEach((project, i) => cols[i % columnCount.value]!.push(project))
  return cols
})

onMounted(() => {
  measure()
  window.addEventListener('resize', measure, { passive: true })
})

onUnmounted(() => window.removeEventListener('resize', measure))
</script>

<template>
  <div class="flex items-start gap-3 sm:gap-4">
    <div
      v-for="(column, c) in columns"
      :key="c"
      class="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4"
      :class="c % 2 ? 'sm:pt-28' : ''"
    >
      <div v-for="(project, i) in column" :key="project.slug" v-reveal="{ delay: (c + i) * 70 }">
        <ProjectTile :project="project" />
      </div>
    </div>
  </div>
</template>
