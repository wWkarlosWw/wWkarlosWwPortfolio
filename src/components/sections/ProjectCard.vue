<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUpRight, ExternalLink } from '@lucide/vue'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import ProjectCover from '@/components/ui/ProjectCover.vue'
import { useLocalized } from '@/composables/useT'
import type { Project } from '@/data/types'

defineProps<{ project: Project }>()
const emit = defineEmits<{ open: [project: Project] }>()

const { t } = useI18n()
const { L } = useLocalized()
</script>

<template>
  <article
    class="group relative flex cursor-pointer flex-col overflow-hidden transition-all duration-500"
    style="background: var(--card)"
    role="button"
    tabindex="0"
    :aria-label="`${t('common.viewProject')}: ${project.title}`"
    @click="emit('open', project)"
    @keydown.enter.prevent="emit('open', project)"
    @keydown.space.prevent="emit('open', project)"
  >
    <!-- Portada generada -->
    <div class="relative overflow-hidden">
      <div class="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
        <ProjectCover
          :slug="project.slug"
          :title="project.title"
          :kind="project.kind"
          ratio="wide"
        />
      </div>

      <!-- Categoría -->
      <span
        class="absolute left-4 top-4 px-3 py-1 text-[0.62rem] font-medium tracking-[0.18em] uppercase"
        style="background: var(--accent); color: var(--on-accent)"
      >
        {{ L(project.category) }}
      </span>

      <!-- Periodo -->
      <span
        v-if="project.period"
        class="absolute right-4 top-4 text-[0.62rem] tracking-wider"
        style="color: rgba(245, 241, 232, 0.7)"
      >
        {{ project.period }}
      </span>

      <!-- Indicador de apertura -->
      <span
        class="absolute bottom-4 right-4 flex size-9 translate-y-2 items-center justify-center border opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        style="border-color: rgba(232, 198, 91, 0.5); background: rgba(13, 26, 20, 0.55); color: #e8c65b"
      >
        <ArrowUpRight :size="15" />
      </span>
    </div>

    <!-- Cuerpo -->
    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-baseline justify-between gap-3">
        <h3
          class="font-display text-2xl transition-colors duration-400 group-hover:text-[color:var(--accent)]"
          style="color: var(--foreground)"
        >
          {{ project.title }}
        </h3>
        <span
          v-if="project.client"
          class="shrink-0 text-[0.65rem] tracking-wider uppercase"
          style="color: var(--muted-foreground)"
        >
          {{ L(project.client) }}
        </span>
      </div>

      <p class="mt-3 flex-1 text-sm font-light leading-relaxed text-pretty" style="color: var(--muted-foreground)">
        {{ L(project.summary) }}
      </p>

      <!-- Stack -->
      <div class="mt-5 flex flex-wrap gap-1.5">
        <span
          v-for="tag in project.tags.slice(0, 4)"
          :key="tag"
          class="border px-2.5 py-1 text-[0.62rem] tracking-wide"
          style="border-color: var(--border); color: var(--muted-foreground)"
        >
          {{ tag }}
        </span>
        <span
          v-if="project.tags.length > 4"
          class="px-2.5 py-1 text-[0.62rem]"
          style="color: var(--accent)"
        >
          +{{ project.tags.length - 4 }}
        </span>
      </div>

      <!-- Enlaces externos: se detiene la propagación para no abrir el detalle -->
      <div
        v-if="project.repo || project.demo"
        class="mt-5 flex items-center gap-4 border-t pt-4"
        style="border-color: var(--border)"
      >
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="link-underline inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors duration-300 hover:text-[color:var(--accent)]"
          style="color: var(--muted-foreground)"
          @click.stop
        >
          <BrandIcon name="github" :size="12" />
          {{ t('common.viewCode') }}
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="link-underline inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors duration-300 hover:text-[color:var(--accent)]"
          style="color: var(--accent)"
          @click.stop
        >
          <ExternalLink :size="12" />
          {{ t('common.liveDemo') }}
        </a>
      </div>
    </div>

    <!-- Filo dorado inferior que crece al pasar el cursor -->
    <span
      class="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 ease-out group-hover:w-full"
      style="background: linear-gradient(90deg, var(--accent), transparent)"
    />
  </article>
</template>
