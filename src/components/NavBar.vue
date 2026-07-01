<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { Sun, Moon, Languages } from "@lucide/vue";
import woodBg from "@/assets/img/navMadera.jpg";

const { t, locale } = useI18n();

const isDark = ref(true);
const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 80;
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  isDark.value = savedTheme ? savedTheme === "dark" : true;
  document.documentElement.setAttribute(
    "data-theme",
    isDark.value ? "dark" : "light",
  );
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute(
    "data-theme",
    isDark.value ? "dark" : "light",
  );
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

function toggleLang() {
  const newLang = locale.value === "es" ? "en" : "es";
  locale.value = newLang;
  localStorage.setItem("lang", newLang);
}

const woodGlassStyle = {
  background: `linear-gradient(rgba(40, 25, 15, 0.25), rgba(40, 25, 15, 0.25)), url(${woodBg}) center / 95% auto no-repeat`,
  backgroundColor: "#4a3525",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};
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
        href="#"
        class="text-lg font-semibold tracking-tight transition-colors duration-300"
        :class="scrolled ? 'text-white font-bold' : 'text-text-primary'"
      >
        &lt;Karlos /&gt;
      </a>

      <div class="hidden items-center gap-6 sm:flex">
        <a
          v-for="item in ['home', 'about', 'projects', 'contact'] as const"
          :key="item"
          href="#"
          class="text-sm font-medium transition-colors duration-300"
          :class="
            scrolled
              ? 'text-white/80 font-semibold hover:text-gold-bright'
              : 'text-text-secondary hover:text-text-primary'
          "
        >
          {{ t(`nav.${item}`) }}
        </a>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300"
          :class="
            scrolled
              ? 'text-white/80 hover:bg-white/10 hover:text-gold-bright'
              : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
          "
          @click="toggleTheme"
          :title="isDark ? 'Light mode' : 'Dark mode'"
        >
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <button
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300"
          :class="
            scrolled
              ? 'text-white/80 hover:bg-white/10 hover:text-gold-bright'
              : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
          "
          @click="toggleLang"
          :title="locale === 'es' ? 'English' : 'Español'"
        >
          <Languages :size="16" />
        </button>
      </div>
    </div>
  </nav>
</template>
