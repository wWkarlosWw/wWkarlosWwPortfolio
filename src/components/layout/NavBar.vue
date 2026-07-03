<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Sun, Moon, Languages } from '@lucide/vue'
import { useThemeStore } from '@/stores/theme'
import { useLocale } from '@/composables/useLocale'
import woodBg from '@/assets/img/navMadera.jpg'

const { t } = useI18n()
const theme = useThemeStore()
const locale = useLocale()

const router = useRouter()
const route = useRoute()

const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const navItems = ['home', 'about', 'projects', 'contact'] as const

function onScroll() {
  scrolled.value = window.scrollY > 80
}

function navigateTo(name: string) {
  const sectionId = name === 'home' ? 'hero' : `${name}-section`
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    router.push({ name, hash: `#${sectionId}` }).catch(() => {})
  } else {
    router.push({ name })
  }
  mobileMenuOpen.value = false
}

onMounted(() => {
  theme.init()
  locale.init()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const woodGlassStyle = {
  background: `linear-gradient(rgba(40, 25, 15, 0.25), rgba(40, 25, 15, 0.25)), url(${woodBg}) center / 95% auto no-repeat`,
  backgroundColor: '#4a3525',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}
</script>

<template>
  <nav
    class="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-full transition-all duration-500 ease-out"
  >
    <div
      class="absolute inset-0 rounded-full shadow-xl shadow-black/25 transition-all duration-500 ease-out"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
      :style="woodGlassStyle"
    />
    <div class="relative z-10 flex items-center justify-between gap-6 px-6 py-3">
      <a
        href="/"
        class="text-lg font-semibold tracking-tight transition-colors duration-300"
        :class="scrolled ? 'text-white font-bold' : 'text-text-primary'"
        @click.prevent="navigateTo('home')"
      >
        &lt;Karlos /&gt;
      </a>

      <div class="hidden items-center gap-6 sm:flex">
        <button
          v-for="item in navItems"
          :key="item"
          class="text-sm font-medium transition-colors duration-300"
          :class="[
            route.name === item
              ? 'text-gold-bright font-semibold'
              : scrolled
                ? 'text-white/80 hover:text-gold-bright'
                : 'text-text-secondary hover:text-text-primary',
          ]"
          @click="navigateTo(item)"
        >
          {{ t(`nav.${item}`) }}
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300"
          :class="
            scrolled
              ? 'text-white/80 hover:bg-white/10 hover:text-gold-bright'
              : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
          "
          @click="theme.toggle()"
          :title="theme.isDark ? 'Light mode' : 'Dark mode'"
        >
          <Sun v-if="theme.isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <button
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300"
          :class="
            scrolled
              ? 'text-white/80 hover:bg-white/10 hover:text-gold-bright'
              : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
          "
          @click="locale.toggle()"
          :title="locale.locale.value === 'es' ? 'English' : 'Español'"
        >
          <Languages :size="16" />
        </button>
      </div>
    </div>
  </nav>
</template>
