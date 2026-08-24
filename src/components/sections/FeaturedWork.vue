<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import { featuredProjects } from '@/data/projects'
import type { Project } from '@/data/types'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectDetail from './ProjectDetail.vue'

const { t } = useI18n()
const selected = ref<Project | null>(null)
</script>

<template>
  <section id="work" class="section-pad" style="background: var(--background)">
    <div class="shell">
      <div v-reveal class="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          :eyebrow="t('projects.featuredLabel')"
          :title="t('projects.featuredTitle')"
          :description="t('projects.featuredDescription')"
        />

        <RouterLink
          :to="{ name: 'projects' }"
          class="link-underline inline-flex shrink-0 items-center gap-2 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[color:var(--accent)]"
          style="color: var(--foreground)"
        >
          {{ t('common.viewAll') }}
          <ArrowRight :size="13" />
        </RouterLink>
      </div>

      <div class="mt-16 grid gap-px sm:grid-cols-2" style="background: var(--border)">
        <div
          v-for="(project, i) in featuredProjects"
          :key="project.slug"
          v-reveal="{ delay: i * 90 }"
        >
          <ProjectCard :project="project" :index="i" @open="selected = $event" />
        </div>
      </div>
    </div>

    <ProjectDetail :project="selected" @close="selected = null" />
  </section>
</template>
