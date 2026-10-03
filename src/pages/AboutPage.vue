<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, Award, Download, GraduationCap } from '@lucide/vue'
import { education, values } from '@/data/experience'
import { postsFor } from '@/data/blog'
import { languages, profile } from '@/data/profile'
import { useLocalized } from '@/composables/useT'
import AmbientGlow from '@/components/ui/AmbientGlow.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ExperienceTimeline from '@/components/about/ExperienceTimeline.vue'
import PostCard from '@/components/blog/PostCard.vue'
import profileImg from '@/assets/img/k8.jpeg'

const { t } = useI18n()
const { L, lang } = useLocalized()

const posts = computed(() => postsFor(lang.value))
const yearsCoding = new Date().getFullYear() - profile.startYear
</script>

<template>
  <div>
    <!-- ================= Encabezado ================= -->
    <section class="tone-light relative overflow-hidden pb-24 pt-40">
      <AmbientGlow />

      <div class="shell relative z-10 grid items-center gap-16 lg:grid-cols-[1fr_0.7fr]">
        <div v-reveal>
          <SectionHeading
            :eyebrow="t('about.label')"
            :title="t('about.title')"
            :title-em="t('about.titleEm')"
            :level="1"
          />

          <p
            class="mt-8 font-display text-2xl leading-snug text-pretty sm:text-3xl"
            style="color: var(--muted-foreground)"
          >
            {{ t('about.intro') }}
          </p>

          <div class="mt-8 space-y-5 text-base leading-[1.85] text-pretty" style="color: var(--muted-foreground)">
            <p>{{ t('about.paragraphs.one') }}</p>
            <p>{{ t('about.paragraphs.two') }}</p>
            <p>{{ t('about.paragraphs.three') }}</p>
          </div>

          <a v-magnetic :href="profile.cv" download class="btn btn-outline mt-10">
            <Download :size="14" />
            {{ t('common.downloadCv') }}
          </a>
        </div>

        <!-- Retrato -->
        <div v-reveal="{ delay: 140 }" class="relative justify-self-center lg:justify-self-end">
          <div
            class="absolute -right-5 -top-5 h-full w-full rounded-[var(--radius-xl)] border"
            style="border-color: var(--accent); opacity: 0.35"
          />
          <div
            v-reveal="{ variant: 'image', delay: 200 }"
            class="relative w-72 overflow-hidden rounded-[var(--radius-xl)] sm:w-80"
            style="background: var(--muted)"
          >
            <img
              :src="profileImg"
              alt="Retrato de Karlos Batista sonriendo"
              width="1251"
              height="1600"
              class="aspect-[4/5] w-full object-cover object-[60%_40%]"
              style="filter: saturate(0.92)"
            />
          </div>

          <div
            class="absolute -bottom-6 -left-6 rounded-[var(--radius)] px-5 py-4"
            style="background: var(--card); border: 1px solid var(--border-strong); box-shadow: var(--shadow-md)"
          >
            <p class="numeric text-4xl leading-none" style="color: var(--accent)">
              {{ yearsCoding }}+
            </p>
            <p class="mt-1.5 text-[0.62rem] tracking-[0.18em] uppercase" style="color: var(--muted-foreground)">
              {{ t('snapshot.stats.experience') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Experiencia ================= -->
    <section class="tone-dark section-pad relative overflow-hidden">
      <AmbientGlow tone="dark" />
      <div class="shell">
        <div v-reveal>
          <SectionHeading
            :eyebrow="t('about.experienceLabel')"
            :title="t('about.experienceTitle')"
          />
        </div>

        <div class="mt-16 max-w-3xl">
          <ExperienceTimeline />
        </div>
      </div>
    </section>

    <!-- ================= Formación y valores ================= -->
    <section class="tone-light section-pad">
      <div class="shell grid gap-16 lg:grid-cols-2">
        <div v-reveal>
          <SectionHeading
            :eyebrow="t('about.educationLabel')"
            :title="t('about.educationTitle')"
          />

          <ul class="tile-grid mt-12 flex flex-col gap-3">
            <li
              v-for="item in education"
              :key="item.slug"
              class="flex gap-5 p-7"
              style="background: var(--background)"
            >
              <GraduationCap :size="18" class="mt-1 shrink-0" style="color: var(--accent)" />
              <div>
                <p class="text-[0.65rem] tracking-[0.2em] uppercase" style="color: var(--accent)">
                  {{ item.period }}
                </p>
                <h3 class="mt-2 font-display text-xl" style="color: var(--foreground)">
                  {{ L(item.title) }}
                </h3>
                <p class="mt-1 text-sm font-medium" style="color: var(--muted-foreground)">
                  {{ item.org }}
                </p>
                <p
                  v-if="item.detail"
                  class="mt-3 text-sm leading-relaxed"
                  style="color: var(--muted-foreground)"
                >
                  {{ L(item.detail) }}
                </p>
              </div>
            </li>
          </ul>

          <!-- Idiomas: el nivel real, sin inflarlo -->
          <div class="mt-16">
            <p class="eyebrow">{{ t('about.languagesTitle') }}</p>

            <ul class="mt-8 space-y-6">
              <li v-for="item in languages" :key="item.name.es">
                <div class="flex items-baseline justify-between gap-4">
                  <span class="font-display text-lg" style="color: var(--foreground)">
                    {{ L(item.name) }}
                  </span>
                  <span class="text-xs tracking-wider" style="color: var(--muted-foreground)">
                    {{ L(item.level) }}
                  </span>
                </div>
                <div class="mt-2.5 h-px w-full" style="background: var(--border)">
                  <div
                    class="h-px"
                    :style="{
                      width: `${item.value}%`,
                      background: 'linear-gradient(90deg, var(--accent), var(--accent-soft))',
                    }"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div v-reveal="{ delay: 120 }">
          <SectionHeading :eyebrow="t('about.valuesLabel')" :title="t('about.valuesTitle')" />

          <div class="tile-grid mt-12 grid gap-3 sm:grid-cols-2">
            <div
              v-for="value in values"
              :key="value.es"
              class="group flex items-center gap-4 p-7 transition-colors duration-500"
              style="background: var(--background)"
            >
              <Award :size="16" class="shrink-0 transition-transform duration-500 group-hover:scale-110" style="color: var(--accent)" />
              <span class="text-sm" style="color: var(--muted-foreground)">
                {{ L(value) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Blog ================= -->
    <section id="blog" class="tone-forest section-pad relative overflow-hidden">
      <AmbientGlow tone="forest" />

      <div class="shell relative z-10">
        <div v-reveal>
          <SectionHeading
            :eyebrow="t('about.blogLabel')"
            :title="t('about.blogTitle')"
            :description="t('about.blogDescription')"
          />
        </div>

        <div
          v-if="posts.length"
          class="tile-grid mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          <div v-for="(post, i) in posts" :key="post.slug" v-reveal="{ delay: i * 90 }" class="flex">
            <PostCard :post="post" class="w-full" />
          </div>
        </div>

        <p v-else class="mt-12 text-sm" style="color: var(--muted-foreground)">
          {{ t('about.blogEmpty') }}
        </p>
      </div>
    </section>

    <!-- ================= Cierre ================= -->
    <section class="tone-dark section-pad relative overflow-hidden">
      <AmbientGlow tone="dark" />
      <div v-reveal class="shell flex flex-col items-center gap-6 text-center">
        <p class="eyebrow">{{ t('about.ctaLabel') }}</p>
        <h2 class="display-md text-balance" style="color: var(--foreground)">
          {{ t('about.ctaTitle') }}
        </h2>
        <p class="max-w-md text-sm leading-relaxed" style="color: var(--muted-foreground)">
          {{ t('about.ctaText') }}
        </p>
        <div class="mt-2 flex flex-wrap justify-center gap-3">
          <RouterLink v-magnetic :to="{ name: 'contact' }" class="btn btn-primary">
            {{ t('hero.ctaContact') }}
            <ArrowRight :size="14" />
          </RouterLink>
          <RouterLink :to="{ name: 'projects' }" class="btn btn-outline">
            {{ t('hero.ctaProjects') }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
