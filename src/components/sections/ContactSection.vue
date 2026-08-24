<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Clock, MapPin } from '@lucide/vue'
import { profile } from '@/data/profile'
import RainCanvas from '@/components/ui/RainCanvas.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ContactChannels from './ContactChannels.vue'
import ContactForm from './ContactForm.vue'

/**
 * Sección de contacto. La lluvia sobre el estanque es el único momento del
 * sitio con movimiento continuo: cierra el recorrido y hace que el formulario
 * se sienta como un lugar tranquilo donde detenerse.
 */
const { t } = useI18n()

/**
 * En el inicio esta sección es una más y su título va como `h2`. En la vista
 * de Contacto es el encabezado de la página, así que sube a `h1` para no
 * dejar la ruta sin uno.
 */
withDefaults(defineProps<{ headingLevel?: 1 | 2 }>(), { headingLevel: 2 })
</script>

<template>
  <section id="contact" class="section-pad relative overflow-hidden" style="background: var(--surface)">
    <RainCanvas />

    <!-- Velo que separa la lluvia del texto -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(70% 55% at 50% 40%, color-mix(in srgb, var(--surface) 82%, transparent), transparent 75%)"
    />

    <div class="shell relative z-10">
      <div v-reveal>
        <SectionHeading
          :eyebrow="t('contact.label')"
          :title="t('contact.title')"
          :title-em="t('contact.titleEm')"
          :description="t('contact.description')"
          align="center"
          :level="headingLevel"
        />
      </div>

      <!-- Contacto directo -->
      <div v-reveal="{ delay: 100 }" class="mx-auto mt-16 max-w-3xl">
        <p class="eyebrow mb-5 text-center">{{ t('contact.directTitle') }}</p>
        <ContactChannels />
      </div>

      <!-- Formulario -->
      <div class="mt-20 grid gap-px lg:grid-cols-[1fr_1.3fr]" style="background: var(--border)">
        <!-- Nota lateral -->
        <div
          v-reveal="{ delay: 140 }"
          class="flex flex-col justify-center gap-8 p-8 sm:p-10"
          style="background: var(--background)"
        >
          <div>
            <p class="eyebrow">{{ t('contact.responseTitle') }}</p>
            <p class="mt-4 text-sm font-light leading-relaxed text-pretty" style="color: var(--muted-foreground)">
              {{ t('contact.responseText') }}
            </p>
          </div>

          <div class="gold-rule" />

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <MapPin :size="15" class="mt-0.5 shrink-0" style="color: var(--accent)" />
              <div>
                <p class="text-[0.65rem] tracking-[0.2em] uppercase" style="color: var(--muted-foreground)">
                  {{ t('snapshot.locationLabel') }}
                </p>
                <p class="mt-1 text-sm" style="color: var(--foreground)">Cochabamba, Bolivia</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <Clock :size="15" class="mt-0.5 shrink-0" style="color: var(--accent)" />
              <div>
                <p class="text-[0.65rem] tracking-[0.2em] uppercase" style="color: var(--muted-foreground)">
                  {{ t('contact.availabilityLabel') }}
                </p>
                <p class="mt-1 text-sm" style="color: var(--foreground)">
                  {{ t('contact.availabilityValue') }} · {{ profile.timezone }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campos -->
        <div v-reveal="{ delay: 200 }" class="p-8 sm:p-10" style="background: var(--background)">
          <p class="eyebrow">{{ t('contact.formTitle') }}</p>
          <p class="mt-2 mb-8 text-sm font-light" style="color: var(--muted-foreground)">
            {{ t('contact.formSubtitle') }}
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>
