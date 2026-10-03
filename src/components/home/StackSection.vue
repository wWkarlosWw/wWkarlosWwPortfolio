<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skillGroups, softSkills, toolbelt } from '@/data/skills'
import { languages } from '@/data/profile'
import { useLocalized } from '@/composables/useT'
import AmbientGlow from '@/components/ui/AmbientGlow.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { t } = useI18n()
const { L } = useLocalized()
</script>

<template>
  <section id="stack" class="tone-forest section-pad relative overflow-hidden">
    <AmbientGlow tone="forest" />

    <div class="shell relative z-10">
      <div v-reveal>
        <SectionHeading
          :eyebrow="t('skills.label')"
          :title="t('skills.title')"
          :title-em="t('skills.titleEm')"
          :description="t('skills.description')"
          align="center"
        />
      </div>

      <!-- Rejilla de grupos -->
      <div
        class="tile-grid mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(group, i) in skillGroups"
          :key="group.key"
          v-reveal="{ delay: i * 70 }"
          class="group p-8 transition-colors duration-500"
          style="background: var(--background)"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-display text-xl" style="color: var(--foreground)">
              {{ L(group.name) }}
            </h3>
            <span class="numeric text-xs" style="color: var(--accent)">
              0{{ i + 1 }}
            </span>
          </div>

          <div
            class="mt-4 h-px w-full origin-left transition-transform duration-700 group-hover:scale-x-100"
            style="background: linear-gradient(90deg, var(--accent), transparent); transform: scaleX(0.35)"
          />

          <ul class="mt-6 space-y-2.5">
            <li
              v-for="item in group.items"
              :key="item"
              class="flex items-center gap-3 text-sm"
              style="color: var(--muted-foreground)"
            >
              <span class="size-1 shrink-0 rotate-45" style="background: var(--accent)" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Herramientas + idiomas + habilidades blandas -->
      <div class="tile-grid mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div v-reveal="{ delay: 120 }" class="p-8 sm:p-10" style="background: var(--background)">
          <p class="eyebrow">{{ t('skills.toolsLabel') }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tool in toolbelt"
              :key="tool"
              class="cursor-default rounded-full border px-4 py-2 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-0.5"
              style="border-color: var(--border); color: var(--muted-foreground)"
              @mouseenter="(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--accent)'
                el.style.color = 'var(--accent)'
              }"
              @mouseleave="(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.color = 'var(--muted-foreground)'
              }"
            >
              {{ tool }}
            </span>
          </div>

          <p class="eyebrow mt-10">{{ t('skills.softLabel') }}</p>
          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div
              v-for="skill in softSkills"
              :key="skill.es"
              class="flex items-center gap-3 text-sm"
              style="color: var(--muted-foreground)"
            >
              <span class="size-1.5 shrink-0 rounded-full" style="background: var(--accent)" />
              {{ L(skill) }}
            </div>
          </div>
        </div>

        <!-- Idiomas -->
        <div v-reveal="{ delay: 180 }" class="p-8 sm:p-10" style="background: var(--background)">
          <p class="eyebrow">{{ t('about.languagesTitle') }}</p>
          <ul class="mt-7 space-y-6">
            <li v-for="lang in languages" :key="lang.name.es">
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-sm font-medium" style="color: var(--foreground)">
                  {{ L(lang.name) }}
                </span>
                <span class="text-[0.68rem] tracking-wider" style="color: var(--muted-foreground)">
                  {{ L(lang.level) }}
                </span>
              </div>
              <div class="mt-2.5 h-px w-full" style="background: var(--border)">
                <div
                  class="h-px transition-all duration-1000 ease-out"
                  :style="{
                    width: `${lang.value}%`,
                    background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 30%, transparent))',
                  }"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
