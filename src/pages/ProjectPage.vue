<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, ArrowUpRight, ExternalLink } from '@lucide/vue'
import { kindLabels, projects } from '@/data/projects'
import { useLocalized } from '@/composables/useT'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import ProjectCover from '@/components/projects/ProjectCover.vue'
import SplitText from '@/components/ui/SplitText.vue'

/**
 * Página propia de cada proyecto.
 *
 * Antes era un modal sobre el listado y se quedaba corto: la captura no tenía
 * sitio, el texto se apretaba y las capas fijas del sitio se le montaban
 * encima. Como página, cada proyecto tiene su URL para compartir, su captura
 * a lo ancho y un paso natural al siguiente.
 */
const props = defineProps<{ slug: string }>()

const { t } = useI18n()
const { L } = useLocalized()
const router = useRouter()

const index = computed(() => projects.findIndex((p) => p.slug === props.slug))
const project = computed(() => projects[index.value])
const next = computed(() => projects[(index.value + 1) % projects.length])

// Un slug que no existe va a la página de no encontrado, sin cambiar la URL.
watch(
  project,
  (p) => {
    if (!p) router.replace({ name: 'not-found', params: { pathMatch: ['proyectos', props.slug] } })
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="project">
    <!-- ================= Cabecera ================= -->
    <section class="tone-light pb-14 pt-36 sm:pt-40">
      <div class="shell">
        <RouterLink
          :to="{ name: 'projects' }"
          class="link-underline inline-flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[color:var(--em)]"
          style="color: var(--muted-foreground); animation: fade-up 0.7s var(--ease-out-soft) both"
        >
          <ArrowLeft :size="13" />
          {{ t('projects.back') }}
        </RouterLink>

        <p class="eyebrow mt-10" style="animation: fade-up 0.8s var(--ease-out-soft) 0.05s both">
          {{ L(project.category) }}
        </p>

        <h1 class="project-title mt-4">
          <SplitText :key="project.slug" :text="project.title" :delay="80" :stagger="28" />
        </h1>

        <p
          class="mt-6 max-w-2xl text-lg leading-relaxed text-pretty"
          style="color: var(--muted-foreground); animation: fade-up 0.9s var(--ease-out-soft) 0.35s both"
        >
          {{ L(project.summary) }}
        </p>

        <!-- Ficha -->
        <dl
          class="mt-12 grid gap-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4"
          style="border-color: var(--border); animation: fade-up 0.9s var(--ease-out-soft) 0.45s both"
        >
          <div v-if="project.client">
            <dt class="meta-label">{{ t('projects.client') }}</dt>
            <dd class="meta-value">{{ L(project.client) }}</dd>
          </div>
          <div>
            <dt class="meta-label">{{ t('projects.type') }}</dt>
            <dd class="meta-value">{{ L(kindLabels[project.kind]) }}</dd>
          </div>
          <div v-if="project.period">
            <dt class="meta-label">{{ t('projects.period') }}</dt>
            <dd class="meta-value">{{ project.period }}</dd>
          </div>
          <div v-if="project.repo || project.demo">
            <dt class="meta-label">{{ t('projects.links') }}</dt>
            <dd class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline inline-flex items-center gap-1.5 text-sm"
                style="color: var(--em)"
              >
                {{ t('common.liveDemo') }}
                <ExternalLink :size="12" />
              </a>
              <a
                v-if="project.repo"
                :href="project.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline inline-flex items-center gap-1.5 text-sm"
                style="color: var(--foreground)"
              >
                <BrandIcon name="github" :size="12" />
                {{ t('common.viewCode') }}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- ================= Captura ================= -->
    <section class="tone-light pb-20">
      <div class="shell">
        <div
          :key="project.slug"
          v-reveal="{ variant: 'image' }"
          class="overflow-hidden rounded-[var(--radius-xl)]"
          style="box-shadow: var(--shadow-lg)"
        >
          <ProjectCover :slug="project.slug" :title="project.title" />
        </div>
      </div>
    </section>

    <!-- ================= Contenido ================= -->
    <section class="tone-dark section-pad">
      <div class="shell grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div v-reveal>
          <p class="eyebrow">{{ t('projects.overview') }}</p>
          <p class="mt-6 font-display text-2xl leading-snug text-pretty sm:text-3xl" style="color: var(--foreground)">
            {{ L(project.description) }}
          </p>

          <template v-if="project.highlights?.length">
            <p class="eyebrow mt-14">{{ t('projects.contribution') }}</p>
            <ol class="mt-6 flex flex-col gap-3">
              <li
                v-for="(item, i) in project.highlights"
                :key="i"
                class="flex gap-5 rounded-[var(--radius)] border p-5 text-sm leading-relaxed"
                style="border-color: var(--border); background: var(--card); color: var(--muted-foreground)"
              >
                <span class="numeric text-xl leading-none" style="color: var(--accent)">0{{ i + 1 }}</span>
                {{ L(item) }}
              </li>
            </ol>
          </template>
        </div>

        <aside v-reveal="{ delay: 120 }" class="lg:sticky lg:top-28 lg:self-start">
          <p class="eyebrow">{{ t('projects.stack') }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border px-4 py-2 text-xs tracking-wide"
              style="border-color: var(--border-strong); color: var(--foreground)"
            >
              {{ tag }}
            </span>
          </div>

          <div v-if="project.repo || project.demo" class="mt-10 flex flex-wrap gap-3">
            <a
              v-if="project.demo"
              v-magnetic
              :href="project.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              {{ t('common.liveDemo') }}
              <ExternalLink :size="13" />
            </a>
            <a
              v-if="project.repo"
              v-magnetic
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline"
            >
              <BrandIcon name="github" :size="14" />
              {{ t('common.viewCode') }}
            </a>
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= Siguiente ================= -->
    <section v-if="next" class="tone-forest">
      <RouterLink
        :to="{ name: 'project', params: { slug: next.slug } }"
        class="group shell flex flex-col gap-6 py-20 sm:py-28"
        :data-cursor="t('common.view')"
      >
        <p class="eyebrow">{{ t('projects.next') }}</p>
        <div class="flex items-end justify-between gap-8">
          <p class="next-title transition-transform duration-700 group-hover:translate-x-3" style="transition-timing-function: var(--ease-out-soft)">
            {{ next.title }}
          </p>
          <span
            class="mb-3 flex size-14 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:rotate-45 sm:size-20"
            style="border-color: var(--border-strong); color: var(--foreground)"
          >
            <ArrowUpRight :size="22" />
          </span>
        </div>
        <p class="text-sm" style="color: var(--muted-foreground)">{{ L(next.summary) }}</p>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.project-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(3rem, 9vw, 8rem);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: var(--foreground);
}

.next-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.75rem, 8vw, 7rem);
  line-height: 0.95;
  color: var(--em);
}

.meta-label {
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.meta-value {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--foreground);
}
</style>
