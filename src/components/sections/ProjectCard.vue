<script setup lang="ts">
import { ref } from 'vue'
import { ExternalLink } from '@lucide/vue'
import { useThemeStore } from '@/stores/theme'

interface Project {
  title: string
  category: string
  description: string
  tags: string[]
  img: string
  link: string
}

defineProps<{ project: Project }>()

const theme = useThemeStore()
const hovered = ref(false)
</script>

<template>
  <div
    class="relative overflow-hidden cursor-pointer group"
    :style="{ backgroundColor: 'var(--background)' }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="relative aspect-video overflow-hidden"
         style="background-color: var(--muted)">
      <img
        :src="project.img"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 transition-opacity duration-500"
        :style="{
          background: theme.isDark
            ? 'linear-gradient(to top, rgba(15,31,24,0.9) 0%, rgba(15,31,24,0.3) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(253,251,247,0.9) 0%, rgba(253,251,247,0.3) 60%, transparent 100%)',
        }"
      />
      <span
        class="absolute top-4 left-4 px-3 py-1 text-xs tracking-wider uppercase font-medium"
        :style="{ background: 'var(--accent)', color: 'var(--accent-foreground)' }"
      >
        {{ project.category }}
      </span>
      <div
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-all duration-300 border"
        :class="hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'"
        :style="{
          borderColor: 'var(--border)',
          backgroundColor: 'color-mix(in srgb, var(--background) 80%, transparent)',
        }"
      >
        <ExternalLink :size="12" style="color: var(--foreground)" />
      </div>
    </div>

    <div class="p-6">
      <h3 class="text-xl font-bold mb-3 transition-colors group-hover:text-accent hover:text-accent"
          style="color: var(--foreground)">
        {{ project.title }}
      </h3>
      <p class="text-sm leading-relaxed mb-5 font-light"
         style="color: var(--muted-foreground)">
        {{ project.description }}
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="text-xs px-2.5 py-1 border tracking-wide"
          :style="{
            borderColor: 'var(--border)',
            color: 'var(--muted-foreground)',
          }"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
