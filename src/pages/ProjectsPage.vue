<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import { kindBlurbs, kindLabels, projectKinds, projects } from '@/data/projects'
import type { ProjectKind } from '@/data/types'
import { useLocalized } from '@/composables/useT'
import AmbientGlow from '@/components/ui/AmbientGlow.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'

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
    <!-- ================= Encabezado y vitrina ================= -->
    <section class="tone-dark relative overflow-hidden pb-28 pt-36 sm:pt-44">
      <AmbientGlow tone="dark" :intensity="0.7" />

      <div class="shell-wide relative z-10">
        <div v-reveal class="grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            :eyebrow="t('projects.label')"
            :title="t('projects.title')"
            :title-em="t('projects.titleEm')"
            :level="1"
          />

          <div class="lg:pb-3">
            <p class="lead max-w-md text-pretty">{{ t('projects.description') }}</p>

            <!-- Recuento: da escala al listado antes de entrar en los filtros -->
            <p class="mt-6 flex items-baseline gap-3 text-xs tracking-[0.16em] uppercase" style="color: var(--muted-foreground)">
              <span class="numeric text-4xl leading-none" style="color: var(--accent)">
                {{ projects.length }}
              </span>
              {{ t('projects.summary', { kinds: projectKinds.length }) }}
            </p>
          </div>
        </div>

        <!-- Filtros -->
        <div v-reveal class="mt-14 flex flex-wrap items-center gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="filter-pill cursor-pointer"
            :class="{ 'is-active': filter === tab.key }"
            :aria-pressed="filter === tab.key"
            @click="setFilter(tab.key)"
          >
            {{ tab.label }}
            <span class="numeric opacity-60">{{ counts[tab.key] }}</span>
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
            class="mt-6 max-w-xl font-display text-2xl leading-snug italic"
            style="color: var(--muted-foreground)"
          >
            {{ activeBlurb }}
          </p>
        </Transition>

        <!-- Vitrina: la `key` la vuelve a montar para que el filtro reanime las fichas -->
        <ProjectGrid :key="filter" :projects="visible" class="mt-12" />

        <p v-if="!visible.length" class="lead mt-12">{{ t('projects.empty') }}</p>
      </div>
    </section>

    <!-- ================= Llamada final ================= -->
    <section class="tone-light section-pad">
      <div v-reveal class="shell flex flex-col items-center gap-6 text-center">
        <h2 class="title display-md items-center text-balance">
          <span class="title-serif">{{ t('projects.ctaTitle') }}</span>
        </h2>
        <p class="lead max-w-md">{{ t('projects.ctaText') }}</p>
        <RouterLink v-magnetic :to="{ name: 'contact' }" class="btn btn-primary">
          {{ t('hero.ctaContact') }}
          <ArrowRight :size="14" />
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.filter-pill {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-foreground);
  transition:
    color 0.3s var(--ease-out-soft),
    border-color 0.3s var(--ease-out-soft),
    background-color 0.3s var(--ease-out-soft);
}
.filter-pill:hover {
  color: var(--foreground);
  border-color: var(--border-strong);
}
.filter-pill.is-active {
  background: var(--foreground);
  border-color: var(--foreground);
  color: var(--background);
}
</style>
