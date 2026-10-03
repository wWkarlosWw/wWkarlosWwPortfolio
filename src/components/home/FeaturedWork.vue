<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import { projects } from '@/data/projects'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'

/** Vitrina del inicio: los destacados primero, hasta llenar dos filas. */
const { t } = useI18n()

const showcase = computed(() =>
  [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 8),
)
</script>

<template>
  <section id="work" class="tone-dark section-pad">
    <div class="shell-wide">
      <div v-reveal class="grid gap-8 lg:grid-cols-2 lg:items-end">
        <SectionHeading
          :eyebrow="t('projects.featuredLabel')"
          :title="t('projects.featuredTitle')"
          :title-em="t('projects.featuredTitleEm')"
        />

        <div class="flex flex-col items-start gap-6 lg:pb-2">
          <p class="lead max-w-md text-pretty">{{ t('projects.featuredDescription') }}</p>
          <RouterLink v-magnetic :to="{ name: 'projects' }" class="btn btn-outline">
            {{ t('common.viewAll') }}
            <ArrowRight :size="14" />
          </RouterLink>
        </div>
      </div>

      <ProjectGrid :projects="showcase" class="mt-16 lg:mt-24" />
    </div>
  </section>
</template>
