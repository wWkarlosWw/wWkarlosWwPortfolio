<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight, Briefcase, GraduationCap, MapPin, Sprout } from '@lucide/vue'
import { profile } from '@/data/profile'
import { projects, projectsByKind } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import AmbientGlow from '@/components/ui/AmbientGlow.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CountUp from '@/components/ui/CountUp.vue'

/**
 * "De un vistazo": el resumen que pide la portada. Cada cifra sale de los
 * datos reales, así que se actualiza sola cuando se añade un proyecto.
 */
const { t } = useI18n()

const stats = computed(() => {
  const years = new Date().getFullYear() - profile.startYear
  const uniqueTech = new Set(projects.flatMap((p) => p.tags))

  return [
    { key: 'experience', value: `${years}+`, label: t('snapshot.stats.experience') },
    { key: 'projects', value: `${projects.length}`, label: t('snapshot.stats.projects') },
    {
      key: 'clients',
      value: `${projectsByKind('freelance').length}`,
      label: t('snapshot.stats.clients'),
    },
    { key: 'stack', value: `${uniqueTech.size}`, label: t('snapshot.stats.stack') },
  ]
})

/** Las tres tecnologías con las que más aparece trabajando. */
const topStack = computed(() =>
  skillGroups
    .filter((g) => ['frontend', 'backend', 'data'].includes(g.key))
    .flatMap((g) => g.items.slice(0, 3)),
)
</script>

<template>
  <section id="snapshot" class="tone-dark section-pad relative overflow-hidden">
    <AmbientGlow tone="dark" />

    <div class="shell relative z-10">
      <div v-reveal>
        <SectionHeading
          :eyebrow="t('snapshot.label')"
          :title="t('snapshot.title')"
          :title-em="t('snapshot.titleEm')"
          :description="t('snapshot.description')"
        />
      </div>

      <!-- Cifras -->
      <div
        v-reveal="{ delay: 100 }"
        class="tile-grid mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="(stat, i) in stats"
          :key="stat.key"
          class="group relative p-8 transition-colors duration-500"
          style="background: var(--background)"
          :style="{ transitionDelay: `${i * 40}ms` }"
        >
          <span
            class="absolute left-0 top-0 h-px w-0 transition-all duration-700 group-hover:w-full"
            style="background: var(--accent)"
          />
          <p class="numeric text-5xl leading-none" style="color: var(--accent)">
            <CountUp :value="stat.value" />
          </p>
          <p
            class="mt-3 text-[0.68rem] tracking-[0.2em] uppercase"
            style="color: var(--muted-foreground)"
          >
            {{ stat.label }}
          </p>
        </div>
      </div>

      <!-- Bloques de contexto -->
      <div class="tile-grid mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <!-- Ahora mismo -->
        <div v-reveal="{ delay: 160 }" class="p-8 sm:p-10" style="background: var(--background)">
          <div class="flex items-center gap-3">
            <Sprout :size="16" style="color: var(--accent)" />
            <p class="eyebrow">{{ t('snapshot.nowTitle') }}</p>
          </div>

          <p
            class="mt-5 font-display text-2xl leading-snug text-pretty sm:text-3xl"
            style="color: var(--foreground)"
          >
            {{ t('snapshot.nowText') }}
          </p>

          <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="tech in topStack"
              :key="tech"
              class="rounded-full border px-3 py-1.5 text-[0.68rem] tracking-wider uppercase transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              style="border-color: var(--border); color: var(--muted-foreground)"
            >
              {{ tech }}
            </span>
          </div>

          <RouterLink
            :to="{ name: 'about' }"
            class="link-underline mt-8 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[color:var(--accent)]"
            style="color: var(--foreground)"
          >
            {{ t('common.readMore') }}
            <ArrowUpRight :size="13" />
          </RouterLink>
        </div>

        <!-- Datos sueltos -->
        <div
          v-reveal="{ delay: 220 }"
          class="flex flex-col justify-center gap-7 p-8 sm:p-10"
          style="background: var(--background)"
        >
          <div class="flex items-start gap-4">
            <MapPin :size="15" class="mt-0.5 shrink-0" style="color: var(--accent)" />
            <div>
              <p class="text-[0.65rem] tracking-[0.2em] uppercase" style="color: var(--muted-foreground)">
                {{ t('snapshot.locationLabel') }}
              </p>
              <p class="mt-1 text-sm" style="color: var(--foreground)">
                Cochabamba, Bolivia · {{ profile.timezone }}
              </p>
            </div>
          </div>

          <div class="gold-rule" />

          <div class="flex items-start gap-4">
            <Briefcase :size="15" class="mt-0.5 shrink-0" style="color: var(--accent)" />
            <div>
              <p class="text-[0.65rem] tracking-[0.2em] uppercase" style="color: var(--muted-foreground)">
                {{ t('snapshot.focusLabel') }}
              </p>
              <p class="mt-1 text-sm" style="color: var(--foreground)">
                {{ t('snapshot.focusValue') }}
              </p>
            </div>
          </div>

          <div class="gold-rule" />

          <div class="flex items-start gap-4">
            <GraduationCap :size="15" class="mt-0.5 shrink-0" style="color: var(--accent)" />
            <div>
              <p class="text-[0.65rem] tracking-[0.2em] uppercase" style="color: var(--muted-foreground)">
                Unifranz
              </p>
              <p class="mt-1 text-sm" style="color: var(--foreground)">
                Ingeniería de Sistemas · 2023 — 2027
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
