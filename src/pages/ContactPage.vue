<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Minus, Plus } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ContactSection from '@/components/contact/ContactSection.vue'

/**
 * Vista de contacto: el mismo bloque del inicio —formulario, canales directos
 * y lluvia— más las preguntas que suelen llegar antes del primer mensaje.
 *
 * El acordeón responde a lo que ya está en `profile` (horario, ubicación,
 * disponibilidad): si esos datos cambian, aquí solo hay que tocar el texto.
 */
const { t } = useI18n()

const faqs = [1, 2, 3, 4] as const
const open = ref<number | null>(1)

function toggle(n: number) {
  open.value = open.value === n ? null : n
}
</script>

<template>
  <div>
    <!-- El encabezado de la sección hace de h1 de la página -->
    <ContactSection :heading-level="1" class="!pt-40" />

    <!-- ================= Preguntas frecuentes ================= -->
    <section class="tone-light section-pad">
      <div class="shell-narrow">
        <div v-reveal>
          <SectionHeading
            :eyebrow="t('contact.faqLabel')"
            :title="t('contact.faqTitle')"
            :title-em="t('contact.faqTitleEm')"
            align="center"
          />
        </div>

        <dl v-reveal="{ delay: 120 }" class="tile-grid mt-16 flex flex-col gap-3">
          <div v-for="n in faqs" :key="n" style="background: var(--background)">
            <dt>
              <button
                class="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-6 text-left transition-colors duration-300 sm:px-8"
                :aria-expanded="open === n"
                :aria-controls="`faq-${n}`"
                @click="toggle(n)"
              >
                <span
                  class="font-display text-xl leading-snug transition-colors duration-300 sm:text-2xl"
                  :style="{ color: open === n ? 'var(--accent)' : 'var(--foreground)' }"
                >
                  {{ t(`contact.faq.q${n}`) }}
                </span>
                <component
                  :is="open === n ? Minus : Plus"
                  :size="16"
                  class="shrink-0 transition-transform duration-300"
                  style="color: var(--accent)"
                />
              </button>
            </dt>

            <!--
              La altura de la respuesta la calcula el navegador con `grid-rows`,
              que sí interpola: con `height: auto` no habría animación.
            -->
            <dd
              :id="`faq-${n}`"
              class="grid transition-all duration-500"
              :class="open === n ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
              style="transition-timing-function: var(--ease-out-soft)"
            >
              <div class="overflow-hidden">
                <p
                  class="px-6 pb-7 text-sm leading-[1.85] text-pretty sm:px-8"
                  style="color: var(--muted-foreground)"
                >
                  {{ t(`contact.faq.a${n}`) }}
                </p>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>
