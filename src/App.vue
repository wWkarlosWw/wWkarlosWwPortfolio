<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function toggleLang() {
  const newLang = locale.value === 'es' ? 'en' : 'es'
  locale.value = newLang
  localStorage.setItem('lang', newLang)
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="flex items-center justify-between p-6">
      <h1 class="text-xl font-bold">Portfolio</h1>
      <button
        class="cursor-pointer rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
        @click="toggleLang"
      >
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>
    </header>

    <main class="mx-auto max-w-4xl px-6">
      <section class="flex min-h-[70vh] flex-col justify-center">
        <p class="text-lg text-gray-400">{{ t('hero.greeting') }}</p>
        <h2 class="mt-2 text-5xl font-bold">Karlos</h2>
        <p class="mt-2 text-2xl text-blue-400">{{ t('hero.role') }}</p>
        <p class="mt-4 max-w-lg text-gray-300">{{ t('hero.description') }}</p>
      </section>
    </main>
  </div>
</template>
