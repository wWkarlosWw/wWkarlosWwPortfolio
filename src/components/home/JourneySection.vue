<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ExperienceTimeline from '@/components/about/ExperienceTimeline.vue'

/**
 * Trayectoria resumida para el inicio.
 *
 * Reutiliza la misma línea de tiempo que Sobre Mí en modo `compact`: así el
 * visitante ve dónde he trabajado sin salir de la portada, y quien quiera el
 * detalle tiene el enlace a la versión larga.
 */
const { t } = useI18n()
</script>

<template>
  <section id="journey" class="tone-light section-pad">
    <div class="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div v-reveal class="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          :eyebrow="t('home.journeyLabel')"
          :title="t('home.journeyTitle')"
          :title-em="t('home.journeyTitleEm')"
          :description="t('home.journeyDescription')"
        />

        <RouterLink :to="{ name: 'about' }" class="btn btn-outline mt-10">
          {{ t('home.journeyCta') }}
          <ArrowRight :size="14" />
        </RouterLink>
      </div>

      <div>
        <ExperienceTimeline compact />
      </div>
    </div>
  </section>
</template>
