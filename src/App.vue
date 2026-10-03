<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavBar from '@/components/layout/NavBar.vue'
import FooterBar from '@/components/layout/FooterBar.vue'
import IntroCurtain from '@/components/ui/IntroCurtain.vue'
import ScrollProgress from '@/components/ui/ScrollProgress.vue'
import CustomCursor from '@/components/ui/CustomCursor.vue'

const route = useRoute()
const { t, locale } = useI18n()

/** Título del documento y atributo lang, sincronizados con ruta e idioma. */
watch(
  [() => route.meta.titleKey, locale],
  ([titleKey]) => {
    document.documentElement.lang = locale.value
    document.title = titleKey
      ? `${t(titleKey as string)} · Karlos Batista`
      : 'Karlos Batista — Full Stack Developer & QA'
  },
  { immediate: true },
)
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:px-4 focus:py-2"
    style="background: var(--accent); color: var(--on-accent)"
  >
    Saltar al contenido
  </a>

  <IntroCurtain />
  <ScrollProgress />
  <CustomCursor />

  <div class="flex min-h-screen flex-col" style="background: var(--background); color: var(--foreground)">
    <NavBar />

    <main id="main" class="flex-1">
      <RouterView v-slot="{ Component, route: r }">
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-3"
          leave-active-class="transition-all duration-250 ease-in"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <component :is="Component" :key="r.path" />
        </Transition>
      </RouterView>
    </main>

    <FooterBar />
  </div>
</template>
