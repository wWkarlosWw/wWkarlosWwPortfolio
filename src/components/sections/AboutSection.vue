<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'

const { t } = useI18n()
const theme = useThemeStore()

const FOREST_ABOUT = 'https://images.unsplash.com/photo-1645601594289-b15fa3f14eea?w=900&h=1100&fit=crop&auto=format'
const stats = t('about.stats') as unknown as Array<{ num: string; label: string }>
</script>

<template>
  <section id="about-section" class="py-28" style="background-color: var(--background)">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <div class="relative order-2 lg:order-1">
          <div
            class="absolute -bottom-6 -right-6 w-48 h-48 hidden lg:block"
            :style="{ background: 'var(--accent)', opacity: 0.08 }"
          />
          <div class="relative overflow-hidden aspect-[3/4] max-w-sm"
               style="background-color: var(--muted)">
            <img
              :src="FOREST_ABOUT"
              alt="Luz de sol entre árboles del bosque"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute bottom-0 left-0 right-0 h-24"
              :style="{
                background: theme.isDark
                  ? 'linear-gradient(to top, #0f1f18, transparent)'
                  : 'linear-gradient(to top, #fdfbf7, transparent)',
              }"
            />
          </div>
          <div
            class="absolute bottom-8 -right-4 lg:-right-12 p-5"
            :style="{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }"
          >
            <p class="text-3xl font-bold"
               style="font-family: 'Bebas Neue', sans-serif; color: var(--foreground)">
              {{ t('about.experience.years') }}
            </p>
            <p class="text-xs tracking-wider uppercase mt-1"
               style="color: var(--muted-foreground)">
              {{ t('about.experience.label') }}
            </p>
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <p
            class="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
            style="color: var(--accent)"
          >
            {{ t('about.label') }}
          </p>
          <h2 class="text-4xl lg:text-5xl font-bold leading-tight mb-8"
              style="color: var(--foreground)">
            {{ t('about.title') }}
            <br />
            <em class="italic" style="color: var(--accent)">
              {{ t('about.titleEm') }}
            </em>
          </h2>

          <div class="space-y-5 leading-relaxed font-light"
               style="color: var(--muted-foreground)">
            <p v-for="(paragraph, i) in (t('about.paragraphs') as unknown as string[])" :key="i">
              {{ paragraph }}
            </p>
          </div>

          <div class="mt-10 grid grid-cols-3 gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="border-l pl-4"
              :style="{ borderColor: 'var(--border)' }"
            >
              <p class="text-2xl font-bold" style="font-family: 'Bebas Neue', sans-serif; color: var(--accent)">
                {{ stat.num }}
              </p>
              <p class="text-xs tracking-wider uppercase mt-1" style="color: var(--muted-foreground)">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
