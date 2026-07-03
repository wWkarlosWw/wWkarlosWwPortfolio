<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/sections/ProjectCard.vue'

const { t } = useI18n()
const projects = t('projects.list') as unknown as Array<{
  title: string
  category: string
  description: string
  tags: string[]
  img: string
  link: string
}>
</script>

<template>
  <section class="py-28" style="background-color: var(--background)">
    <div class="max-w-6xl mx-auto px-6">
      <div class="mb-16 max-w-2xl">
        <p
          class="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
          style="color: var(--accent)"
        >
          {{ t('projects.label') }}
        </p>
        <h2 class="text-4xl lg:text-5xl font-bold mb-6" style="color: var(--foreground)">
          {{ t('projects.title') }}
        </h2>
        <p class="text-base leading-relaxed font-light"
           style="color: var(--muted-foreground)">
          {{ t('projects.description') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="i"
          :project="project"
        />
      </div>

      <div class="mt-20 border-t pt-12 text-center"
           :style="{ borderColor: 'var(--border)' }">
        <p class="text-sm font-light mb-6" style="color: var(--muted-foreground)">
          ¿Te interesa alguno de estos proyectos o tienes una idea similar en mente?
        </p>
        <router-link
          to="/contact"
          class="inline-block px-8 py-3.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:opacity-90"
          :style="{
            background: 'var(--accent)',
            color: 'var(--accent-foreground)',
          }"
        >
          Conversemos
        </router-link>
      </div>
    </div>
  </section>
</template>
