<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const skillGroups = t('skills.groups') as unknown as Array<{ name: string; items: string[] }>
const tools = t('skills.tools') as unknown as string[]
</script>

<template>
  <section id="skills-section" class="py-28 relative overflow-hidden"
           style="background-color: var(--background)">
    <div class="absolute inset-0 z-0 opacity-[0.04]">
      <img
        src="https://images.unsplash.com/photo-1426170042593-200f250dfdaf?w=1400&h=800&fit=crop&auto=format"
        alt=""
        aria-hidden
        class="w-full h-full object-cover"
      />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <p
          class="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
          style="color: var(--accent)"
        >
          {{ t('skills.label') }}
        </p>
        <h2 class="text-4xl lg:text-5xl font-bold" style="color: var(--foreground)">
          {{ t('skills.title') }}
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-px"
           style="background-color: var(--border)">
        <div
          v-for="group in skillGroups"
          :key="group.name"
          class="p-8"
          :style="{ backgroundColor: 'var(--background)' }"
        >
          <h3
            class="text-lg font-bold mb-6 pb-4 border-b"
            :style="{
              borderColor: 'var(--accent)',
              color: 'var(--foreground)',
            }"
          >
            {{ group.name }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="item in group.items"
              :key="item"
              class="flex items-center gap-3 text-sm font-light"
              :style="{ color: 'var(--muted-foreground)' }"
            >
              <span
                class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :style="{ background: 'var(--accent)' }"
              />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 border p-8" :style="{ borderColor: 'var(--border)' }">
        <p class="text-xs tracking-[0.3em] uppercase mb-6 font-medium"
           :style="{ color: 'var(--muted-foreground)' }">
          {{ t('skills.toolsLabel') }}
        </p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="tool in tools"
            :key="tool"
            class="px-4 py-1.5 text-xs tracking-wider uppercase border font-medium cursor-default transition-colors hover:border-accent hover:text-accent"
            :style="{
              borderColor: 'var(--border)',
              color: 'var(--muted-foreground)',
            }"
          >
            {{ tool }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
