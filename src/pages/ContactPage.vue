<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mail, Globe, Code2, ArrowRight, MapPin, Clock } from '@lucide/vue'

const { t } = useI18n()

const contactForm = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
const contactInfo = t('contact.info') as unknown as Array<{ icon: string; label: string; value: string }>

const iconMap: Record<string, any> = { mail: Mail, linkedin: Globe, github: Code2 }

function handleSubmit(e: Event) {
  e.preventDefault()
  sent.value = true
  setTimeout(() => (sent.value = false), 3000)
  contactForm.name = ''
  contactForm.email = ''
  contactForm.message = ''
}
</script>

<template>
  <section class="py-28" style="background-color: var(--background)">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <p
            class="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
            style="color: var(--accent)"
          >
            {{ t('contact.label') }}
          </p>
          <h2 class="text-4xl lg:text-5xl font-bold mb-8 leading-tight"
               style="color: var(--foreground)">
            {{ t('contact.title') }}
            <br />
            <em class="italic" style="color: var(--accent)">
              {{ t('contact.titleEm') }}
            </em>
          </h2>
          <p class="leading-relaxed font-light mb-10 max-w-sm"
             style="color: var(--muted-foreground)">
            {{ t('contact.description') }}
          </p>

          <div class="space-y-5">
            <div
              v-for="item in contactInfo"
              :key="item.label"
              class="flex items-center gap-4"
            >
              <div
                class="w-10 h-10 border flex items-center justify-center"
                :style="{
                  borderColor: 'var(--border)',
                  color: 'var(--accent)',
                }"
              >
                <component :is="iconMap[item.icon]" :size="15" />
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider"
                   style="color: var(--muted-foreground)">
                  {{ item.label }}
                </p>
                <p class="text-sm font-medium" style="color: var(--foreground)">
                  {{ item.value }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-12 border-t pt-8 space-y-4"
               :style="{ borderColor: 'var(--border)' }">
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 border flex items-center justify-center"
                :style="{
                  borderColor: 'var(--border)',
                  color: 'var(--accent)',
                }"
              >
                <MapPin :size="15" />
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider"
                   style="color: var(--muted-foreground)">
                  Ubicación
                </p>
                <p class="text-sm font-medium" style="color: var(--foreground)">
                  Bogotá, Colombia
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 border flex items-center justify-center"
                :style="{
                  borderColor: 'var(--border)',
                  color: 'var(--accent)',
                }"
              >
                <Clock :size="15" />
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider"
                   style="color: var(--muted-foreground)">
                  Disponibilidad
                </p>
                <p class="text-sm font-medium" style="color: var(--foreground)">
                  Full-time / Freelance
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="border p-8 mb-8" :style="{ borderColor: 'var(--border)' }">
            <p class="text-xs tracking-[0.3em] uppercase mb-6 font-medium"
               :style="{ color: 'var(--muted-foreground)' }">
              Respuesta rápida
            </p>
            <p class="text-sm font-light leading-relaxed"
               style="color: var(--muted-foreground)">
              Por lo general respondo en menos de 24 horas. Si tu mensaje es urgente, no dudes en escribirme también por LinkedIn.
            </p>
          </div>

          <form @submit="handleSubmit" class="space-y-5">
            <div>
              <label
                class="block text-xs tracking-[0.2em] uppercase mb-2 font-medium"
                style="color: var(--muted-foreground)"
              >
                {{ t('contact.form.name') }}
              </label>
              <input
                type="text"
                required
                v-model="contactForm.name"
                :placeholder="(t('contact.form.namePlaceholder') as string)"
                class="w-full border px-4 py-3 text-sm placeholder:opacity-50 focus:outline-none focus:border-accent transition-colors font-light"
                :style="{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }"
              />
            </div>
            <div>
              <label
                class="block text-xs tracking-[0.2em] uppercase mb-2 font-medium"
                style="color: var(--muted-foreground)"
              >
                {{ t('contact.form.email') }}
              </label>
              <input
                type="email"
                required
                v-model="contactForm.email"
                :placeholder="(t('contact.form.emailPlaceholder') as string)"
                class="w-full border px-4 py-3 text-sm placeholder:opacity-50 focus:outline-none focus:border-accent transition-colors font-light"
                :style="{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }"
              />
            </div>
            <div>
              <label
                class="block text-xs tracking-[0.2em] uppercase mb-2 font-medium"
                style="color: var(--muted-foreground)"
              >
                {{ t('contact.form.message') }}
              </label>
              <textarea
                required
                rows="6"
                v-model="contactForm.message"
                :placeholder="(t('contact.form.messagePlaceholder') as string)"
                class="w-full border px-4 py-3 text-sm placeholder:opacity-50 focus:outline-none focus:border-accent transition-colors resize-none font-light"
                :style="{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }"
              />
            </div>
            <button
              type="submit"
              class="w-full py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-3"
              :style="{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }"
            >
              <template v-if="sent">
                {{ t('contact.form.sent') }}
              </template>
              <template v-else>
                {{ t('contact.form.submit') }}
                <ArrowRight :size="14" />
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
