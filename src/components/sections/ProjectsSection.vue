<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProjectCard from './ProjectCard.vue'

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
  <section id="projects-section" class="py-28" style="background-color: var(--secondary)">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p
            class="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
            style="color: var(--accent)"
          >
            {{ t('projects.label') }}
          </p>
          <h2 class="text-4xl lg:text-5xl font-bold" style="color: var(--foreground)">
            {{ t('projects.title') }}
          </h2>
        </div>
        <p class="max-w-xs text-sm leading-relaxed font-light"
           style="color: var(--muted-foreground)">
          {{ t('projects.description') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-px" style="background-color: var(--border)">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="i"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
