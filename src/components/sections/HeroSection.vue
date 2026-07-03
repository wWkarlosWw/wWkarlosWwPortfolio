<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ChevronDown } from "@lucide/vue";
import { useThemeStore } from "@/stores/theme";
import profileImg from "@/assets/img/waka.jpeg";

const { t } = useI18n();
const theme = useThemeStore();

const FOREST_HERO =
  "https://images.unsplash.com/photo-1544039161-b0c20826c6f6?w=1800&h=1000&fit=crop&auto=format";
const FOREST_DARK =
  "https://images.unsplash.com/photo-1641667838410-b257ca266e38?w=1800&h=1000&fit=crop&auto=format";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden"
  >
    <div class="absolute inset-0 z-0">
      <img
        :src="theme.isDark ? FOREST_DARK : FOREST_HERO"
        alt="Bosque majestuoso"
        class="w-full h-full object-cover transition-opacity duration-700"
      />
      <div
        class="absolute inset-0 transition-colors duration-500"
        :class="
          theme.isDark
            ? 'bg-gradient-to-r from-[#0f1f18]/95 via-[#0f1f18]/80 to-[#0f1f18]/40'
            : 'bg-gradient-to-r from-[#fdfbf7]/95 via-[#fdfbf7]/75 to-[#fdfbf7]/20'
        "
      />
    </div>

    <div
      class="absolute left-1/2 top-0 w-px h-32 hidden lg:block"
      style="background: linear-gradient(to bottom, transparent, var(--accent))"
    />

    <div
      class="relative z-10 max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center"
    >
      <div>
        <p
          class="text-xs tracking-[0.3em] uppercase mb-6 font-medium"
          style="color: var(--accent)"
        >
          {{ t("hero.label") }}
        </p>

        <h1 class="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
          {{ t("hero.firstName") }}
          <br />
          <em class="italic" style="color: var(--accent)">
            {{ t("hero.lastName") }}
          </em>
        </h1>

        <p
          class="text-base lg:text-lg leading-relaxed max-w-md mb-10 font-light"
          style="color: var(--muted-foreground)"
        >
          {{ t("hero.description") }}
        </p>

        <div class="flex flex-wrap gap-4">
          <button
            @click="scrollTo('projects-section')"
            class="px-8 py-3.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:opacity-90 hover:translate-y-[-1px]"
            :style="{
              background: 'var(--accent)',
              color: 'var(--accent-foreground)',
            }"
          >
            {{ t("hero.ctaProjects") }}
          </button>
          <button
            @click="scrollTo('contact-section')"
            class="px-8 py-3.5 text-sm font-medium tracking-wider uppercase border transition-all duration-300 hover:translate-y-[-1px]"
            :style="{
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }"
          >
            {{ t("hero.ctaContact") }}
          </button>
        </div>
      </div>

      <div class="hidden lg:flex justify-end">
        <div class="relative">
          <div
            class="absolute -top-4 -left-4 w-full h-full border"
            :style="{ borderColor: 'var(--accent)', opacity: 0.4 }"
          />
          <div
            class="w-72 h-80 overflow-hidden bg-muted relative"
            style="background-color: var(--muted)"
          >
            <img
              :src="profileImg"
              alt="Foto de perfil de Karlos Batista"
              class="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
            />
            <div
              class="absolute inset-0 opacity-10"
              :style="{
                background: theme.isDark
                  ? 'linear-gradient(135deg, var(--accent), transparent)'
                  : 'linear-gradient(135deg, var(--primary), transparent)',
              }"
            />
          </div>
          <div
            class="absolute -bottom-4 -right-4 px-4 py-2 text-xs tracking-wider uppercase font-medium"
            :style="{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }"
          >
            {{ t("hero.available") }}
          </div>
        </div>
      </div>
    </div>

    <button
      @click="scrollTo('about-section')"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-colors"
      :style="{ color: 'var(--muted-foreground)' }"
    >
      <span class="text-xs tracking-[0.2em] uppercase">{{
        t("hero.scroll")
      }}</span>
      <ChevronDown :size="16" class="animate-bounce" />
    </button>
  </section>
</template>
