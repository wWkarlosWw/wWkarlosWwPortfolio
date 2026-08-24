<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import { kindBlurbs, kindLabels, projectKinds, projects } from '@/data/projects'
import type { Project, ProjectKind } from '@/data/types'
import { useLocalized } from '@/composables/useT'
import ForestBackdrop from '@/components/ui/ForestBackdrop.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/sections/ProjectCard.vue'
import ProjectDetail from '@/components/sections/ProjectDetail.vue'

/**
 * Todo el trabajo en una sola vista, con el filtro por tipo en la URL.
 * Así el submenú de la navbar puede enlazar directo a una categoría y el
 * visitante puede compartir el enlace ya filtrado.
 */
const { t } = useI18n()
const { L } = useLocalized()
const route = useRoute()
const router = useRouter()

type Filter = ProjectKind | 'all'

const filter = ref<Filter>('all')
const selected = ref<Project | null>(null)

function isKind(value: unknown): value is ProjectKind {
  return typeof value === 'string' && (projectKinds as string[]).includes(value)
}

// La URL manda: al entrar y en cada cambio de query.
watch(
  () => route.query.tipo,
  (tipo) => {
    filter.value = isKind(tipo) ? tipo : 'all'
  },
  { immediate: true },
)

function setFilter(next: Filter) {
  filter.value = next
  router.replace({
    name: 'projects',
    query: next === 'all' ? {} : { tipo: next },
  })
}

const visible = computed(() =>
  filter.value === 'all' ? projects : projects.filter((p) => p.kind === filter.value),
)

/** Cuando hay un filtro activo se muestra su descripción bajo las pestañas. */
const activeBlurb = computed(() =>
  filter.value === 'all' ? '' : L(kindBlurbs[filter.value]),
)

const counts = computed(() => {
  const map: Record<string, number> = { all: projects.length }
  for (const kind of projectKinds) {
    map[kind] = projects.filter((p) => p.kind === kind).length
  }
  return map
})

const tabs = computed<Array<{ key: Filter; label: string }>>(() => [
  { key: 'all', label: t('projects.all') },
  ...projectKinds.map((kind) => ({ key: kind as Filter, label: L(kindLabels[kind]) })),
])
</script>

<template>
  <div>
    <!-- ================= Encabezado ================= -->
    <section class="relative overflow-hidden pb-16 pt-40" style="background: var(--background)">
      <ForestBackdrop variant="soft" :intensity="0.8" />

      <div class="shell relative z-10">
        <div v-reveal>
          <SectionHeading
            :eyebrow="t('projects.label')"
            :title="t('projects.title')"
            :title-em="t('projects.titleEm')"
            :description="t('projects.description')"
            :level="1"
          />

          <!-- Recuento: da escala al listado antes de entrar en las pestañas -->
          <p class="mt-8 flex items-baseline gap-2 text-xs tracking-[0.16em] uppercase" style="color: var(--muted-foreground)">
            <span class="numeric text-3xl leading-none" style="color: var(--accent)">
              {{ projects.length }}
            </span>
            {{ t('projects.summary', { kinds: projectKinds.length }) }}
          </p>
        </div>
      </div>
    </section>

    <!-- ================= Filtros y rejilla ================= -->
    <section class="pb-28" style="background: var(--background)">
      <div class="shell">
        <!-- Pestañas -->
        <div
          v-reveal
          class="flex flex-wrap items-center gap-x-2 gap-y-3 border-y py-4"
          style="border-color: var(--border)"
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="group relative cursor-pointer px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300"
            :style="{
              color: filter === tab.key ? 'var(--accent)' : 'var(--muted-foreground)',
            }"
            :aria-pressed="filter === tab.key"
            @click="setFilter(tab.key)"
          >
            {{ tab.label }}
            <sup class="ml-1 text-[0.6rem] opacity-70">{{ counts[tab.key] }}</sup>
            <span
              class="absolute inset-x-2 -bottom-px h-px origin-left transition-transform duration-400"
              :class="filter === tab.key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
              style="background: var(--accent)"
            />
          </button>
        </div>

        <!-- Descripción del filtro activo -->
        <Transition
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          leave-active-class="transition duration-200"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <p
            v-if="activeBlurb"
            :key="filter"
            class="mt-6 max-w-xl font-display text-xl leading-snug"
            style="color: var(--muted-foreground)"
          >
            {{ activeBlurb }}
          </p>
        </Transition>

        <!-- Rejilla -->
        <TransitionGroup
          tag="div"
          class="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3"
          style="background: var(--border)"
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          leave-active-class="absolute transition duration-200 ease-in"
          leave-to-class="opacity-0 scale-95"
          move-class="transition duration-500 ease-out"
        >
          <ProjectCard
            v-for="(project, i) in visible"
            :key="project.slug"
            :project="project"

            @open="selected = $event"
          />
        </TransitionGroup>

        <p
          v-if="!visible.length"
          class="mt-12 text-sm font-light"
          style="color: var(--muted-foreground)"
        >
          {{ t('projects.empty') }}
        </p>

        <!-- Llamada final -->
        <div
          v-reveal
          class="mt-20 flex flex-col items-center gap-6 border-t pt-14 text-center"
          style="border-color: var(--border)"
        >
          <h3 class="font-display text-3xl text-balance" style="color: var(--foreground)">
            {{ t('projects.ctaTitle') }}
          </h3>
          <p class="max-w-md text-sm font-light leading-relaxed" style="color: var(--muted-foreground)">
            {{ t('projects.ctaText') }}
          </p>
          <RouterLink :to="{ name: 'contact' }" class="btn btn-gold">
            {{ t('hero.ctaContact') }}
            <ArrowRight :size="14" />
          </RouterLink>
        </div>
      </div>
    </section>

    <ProjectDetail :project="selected" @close="selected = null" />
  </div>
</template>
