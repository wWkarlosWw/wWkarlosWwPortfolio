<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ExternalLink, X } from '@lucide/vue'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import ProjectCover from '@/components/ui/ProjectCover.vue'
import { useLocalized } from '@/composables/useT'
import { kindLabels } from '@/data/projects'
import type { Project } from '@/data/types'

/** Panel de detalle de un proyecto, sobre el listado. */
const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()
const { L } = useLocalized()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.project,
  (project) => {
    document.body.style.overflow = project ? 'hidden' : ''
    if (project) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-300 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="project"
        class="fixed inset-0 z-[60] overflow-y-auto"
        style="background: color-mix(in srgb, var(--background) 88%, transparent); backdrop-filter: blur(14px)"
        role="dialog"
        aria-modal="true"
        @click.self="emit('close')"
      >
        <div class="flex min-h-full items-start justify-center p-4 py-16 sm:p-8 sm:py-20">
          <div
            class="relative w-full max-w-4xl overflow-hidden"
            style="background: var(--card); border: 1px solid var(--border-strong); box-shadow: var(--shadow-lg)"
            :style="{ animation: 'fade-up 0.5s var(--ease-out-soft) both' }"
          >
            <!-- Cerrar -->
            <button
              class="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center border transition-all duration-300 hover:rotate-90"
              style="border-color: var(--border-strong); background: var(--card); color: var(--foreground)"
              :aria-label="t('projects.closeDetail')"
              @click="emit('close')"
            >
              <X :size="16" />
            </button>

            <div class="grid md:grid-cols-[0.85fr_1.15fr]">
              <!-- Portada vertical -->
              <div class="relative">
                <ProjectCover
                  :slug="project.slug"
                  :title="project.title"
                  :kind="project.kind"
                  ratio="tall"
                />
                <span
                  class="absolute left-5 top-5 px-3 py-1 text-[0.62rem] font-medium tracking-[0.18em] uppercase"
                  style="background: var(--accent); color: var(--on-accent)"
                >
                  {{ L(kindLabels[project.kind]) }}
                </span>
              </div>

              <!-- Contenido -->
              <div class="p-8 sm:p-10">
                <p class="eyebrow">{{ L(project.category) }}</p>

                <h2 class="display-md mt-3" style="color: var(--foreground)">
                  {{ project.title }}
                </h2>

                <p
                  v-if="project.client || project.period"
                  class="mt-3 text-sm font-light"
                  style="color: var(--muted-foreground)"
                >
                  <span v-if="project.client">{{ L(project.client) }}</span>
                  <span v-if="project.client && project.period"> · </span>
                  <span v-if="project.period">{{ project.period }}</span>
                </p>

                <div class="gold-rule my-7" />

                <p class="text-[0.95rem] leading-[1.8] font-light text-pretty" style="color: var(--muted-foreground)">
                  {{ L(project.description) }}
                </p>

                <!-- Aportes -->
                <template v-if="project.highlights?.length">
                  <p class="eyebrow mt-9">{{ t('projects.contribution') }}</p>
                  <ul class="mt-4 space-y-3">
                    <li
                      v-for="(item, i) in project.highlights"
                      :key="i"
                      class="flex gap-3 text-sm font-light leading-relaxed"
                      style="color: var(--muted-foreground)"
                    >
                      <span
                        class="mt-2 size-1.5 shrink-0 rotate-45"
                        style="background: var(--accent)"
                      />
                      {{ L(item) }}
                    </li>
                  </ul>
                </template>

                <!-- Stack -->
                <p class="eyebrow mt-9">{{ t('projects.stack') }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="border px-3 py-1.5 text-[0.68rem] tracking-wide"
                    style="border-color: var(--border); color: var(--muted-foreground)"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Enlaces -->
                <div v-if="project.repo || project.demo" class="mt-9 flex flex-wrap gap-3">
                  <a
                    v-if="project.demo"
                    :href="project.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-gold"
                  >
                    {{ t('common.liveDemo') }}
                    <ExternalLink :size="13" />
                  </a>
                  <a
                    v-if="project.repo"
                    :href="project.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-outline"
                  >
                    <BrandIcon name="github" :size="14" />
                    {{ t('common.viewCode') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
