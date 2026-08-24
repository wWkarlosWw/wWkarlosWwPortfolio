<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, ChevronDown, Download, MapPin } from '@lucide/vue'
import { profile } from '@/data/profile'
import { useThemeStore } from '@/stores/theme'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import profileImg from '@/assets/img/waka.jpeg'
import forestDark from '@/assets/img/bosqueOscuro.jpg'
import forestLight from '@/assets/img/bosqueClaro.jpg'

/**
 * Héroe con fotografía de bosque a sangre, como estaba en el diseño original.
 *
 * Las dos imágenes viven en el repositorio en lugar de venir de Unsplash: el
 * fondo es lo primero que se ve, y depender de una petición externa hacía que
 * la portada apareciera vacía durante el primer segundo.
 */
const { t } = useI18n()
const theme = useThemeStore()

/** Desplazamiento leve del fondo al hacer scroll: profundidad sin marear. */
const offset = ref(0)
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    offset.value = Math.min(window.scrollY, 700)
    ticking = false
  })
}

/**
 * Fundido entre las dos fotografías al cambiar de tema.
 *
 * Las dos imágenes están siempre montadas y solo cruzan su opacidad: cambiar
 * el `src` producía un parpadeo en blanco porque el navegador descartaba la
 * anterior antes de tener la nueva. La que entra parte de una escala mayor y
 * se asienta, para que el cambio se sienta como un amanecer y no como un corte.
 */
const layers = computed(() => [
  { src: forestDark, on: theme.isDark },
  { src: forestLight, on: !theme.isDark },
])

/** Destello dorado que acompaña el cambio; `bloomKey` reinicia la animación. */
const blooming = ref(false)
const bloomKey = ref(0)
let bloomTimer: number | undefined

watch(
  () => theme.pulse,
  () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    bloomKey.value += 1
    blooming.value = true
    window.clearTimeout(bloomTimer)
    bloomTimer = window.setTimeout(() => (blooming.value = false), 1200)
  },
)

const socials = [
  { name: 'github' as const, href: profile.github, label: 'GitHub' },
  { name: 'linkedin' as const, href: profile.linkedin, label: 'LinkedIn' },
  { name: 'whatsapp' as const, href: `https://wa.me/${profile.whatsapp}`, label: 'WhatsApp' },
]

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.clearTimeout(bloomTimer)
})

function scrollToNext() {
  document.getElementById('snapshot')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative flex min-h-[100svh] items-center overflow-hidden">
    <!-- ================= Fondo ================= -->
    <div class="absolute inset-0 z-0">
      <!-- El paralaje vive en el contenedor para no chocar con la escala del fundido -->
      <div class="absolute inset-0" :style="{ transform: `translateY(${offset * 0.14}px)` }">
        <img
          v-for="layer in layers"
          :key="layer.src"
          :src="layer.src"
          alt=""
          aria-hidden="true"
          data-anim
          class="hero-layer"
          :style="{ opacity: layer.on ? 1 : 0, transform: `scale(${layer.on ? 1.06 : 1.16})` }"
        />
      </div>

      <!-- Velo lateral: deja el texto legible y el bosque visible a la derecha -->
      <div
        data-anim
        class="hero-veil"
        :style="{
          opacity: theme.isDark ? 1 : 0,
          background:
            'linear-gradient(100deg, rgba(13,26,20,0.96) 0%, rgba(13,26,20,0.86) 42%, rgba(13,26,20,0.42) 100%)',
        }"
      />
      <div
        data-anim
        class="hero-veil"
        :style="{
          opacity: theme.isDark ? 0 : 1,
          background:
            'linear-gradient(100deg, rgba(250,248,242,0.96) 0%, rgba(250,248,242,0.84) 42%, rgba(250,248,242,0.28) 100%)',
        }"
      />

      <!-- Desvanecido inferior hacia la siguiente sección -->
      <div
        class="absolute inset-x-0 bottom-0 h-40"
        :style="{
          background: `linear-gradient(to top, var(--background), transparent)`,
        }"
      />
    </div>

    <!-- Destello del cambio de tema, nace bajo el botón que lo pidió -->
    <div v-if="blooming" :key="bloomKey" data-anim class="theme-bloom" aria-hidden="true" />

    <!-- Filete vertical: arranca por debajo de la píldora de la navbar -->
    <div class="gold-rule-v absolute left-1/2 top-[var(--nav-h)] z-10 hidden h-24 lg:block" />

    <!-- ================= Contenido ================= -->
    <div class="shell relative z-10 grid items-center gap-14 py-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
      <div>
        <div
          class="flex items-center gap-3"
          :style="{ animation: 'fade-up 0.8s var(--ease-out-soft) 0.05s both' }"
        >
          <span class="block h-px w-10" style="background: linear-gradient(90deg, transparent, var(--accent))" />
          <p class="eyebrow">{{ t('hero.label') }}</p>
        </div>

        <h1
          class="display-xl mt-6 leading-[0.92]"
          style="color: var(--foreground)"
          :style="{ animation: 'fade-up 0.9s var(--ease-out-soft) 0.15s both' }"
        >
          {{ t('hero.firstName') }}
          <span class="block serif-em">{{ t('hero.lastName') }}</span>
        </h1>

        <p
          class="mt-5 font-display text-2xl font-light lg:text-3xl"
          style="color: var(--muted-foreground)"
          :style="{ animation: 'fade-up 0.9s var(--ease-out-soft) 0.28s both' }"
        >
          {{ t('hero.tagline') }}
          <em class="serif-em">{{ t('hero.taglineEm') }}</em>
        </p>

        <p
          class="mt-8 max-w-lg text-base font-light leading-relaxed text-pretty"
          style="color: var(--muted-foreground)"
          :style="{ animation: 'fade-up 0.9s var(--ease-out-soft) 0.4s both' }"
        >
          {{ t('hero.description') }}
        </p>

        <div
          class="mt-10 flex flex-wrap items-center gap-3"
          :style="{ animation: 'fade-up 0.9s var(--ease-out-soft) 0.52s both' }"
        >
          <RouterLink :to="{ name: 'projects' }" class="btn btn-gold">
            {{ t('hero.ctaProjects') }}
            <ArrowRight :size="14" />
          </RouterLink>
          <RouterLink :to="{ name: 'contact' }" class="btn btn-outline">
            {{ t('hero.ctaContact') }}
          </RouterLink>
          <a :href="profile.cv" download class="btn btn-outline" style="border-color: transparent">
            <Download :size="14" />
            {{ t('common.downloadCv') }}
          </a>
        </div>

        <!-- Contacto directo, sin salir del inicio -->
        <div
          class="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t pt-8"
          style="border-color: var(--border)"
          :style="{ animation: 'fade-up 0.9s var(--ease-out-soft) 0.64s both' }"
        >
          <span class="flex items-center gap-2 text-xs tracking-wider" style="color: var(--muted-foreground)">
            <MapPin :size="13" style="color: var(--accent)" />
            Cochabamba, Bolivia
          </span>

          <span class="hidden h-4 w-px sm:block" style="background: var(--border)" />

          <div class="flex items-center gap-1">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style="color: var(--muted-foreground)"
              :aria-label="s.label"
              @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')"
              @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)')"
            >
              <BrandIcon :name="s.name" :size="17" />
            </a>
          </div>

          <span class="hidden h-4 w-px sm:block" style="background: var(--border)" />

          <a
            :href="`mailto:${profile.email}`"
            class="link-underline text-xs tracking-wide transition-colors duration-300 hover:text-[color:var(--accent)]"
            style="color: var(--muted-foreground)"
          >
            {{ profile.email }}
          </a>
        </div>
      </div>

      <!-- Retrato -->
      <div
        class="relative hidden justify-self-end lg:block"
        :style="{
          transform: `translateY(${offset * -0.04}px)`,
          animation: 'fade-up 1s var(--ease-out-soft) 0.35s both',
        }"
      >
        <div class="absolute -left-5 -top-5 h-full w-full border" style="border-color: var(--accent); opacity: 0.45" />
        <div class="absolute -bottom-5 -right-5 h-full w-full border" style="border-color: var(--accent); opacity: 0.18" />

        <div class="relative w-[19rem] overflow-hidden" style="background: var(--muted)">
          <img
            :src="profileImg"
            alt="Retrato de Karlos Batista"
            width="899"
            height="1599"
            class="aspect-[4/5] w-full object-cover object-top"
            style="filter: saturate(0.9) contrast(1.04)"
          />
          <div
            class="absolute inset-0"
            style="background: linear-gradient(160deg, transparent 45%, rgba(13, 26, 20, 0.35))"
          />
        </div>

        <div
          class="absolute -bottom-4 -left-6 flex items-center gap-2.5 px-4 py-2.5"
          style="background: var(--card); border: 1px solid var(--border-strong); box-shadow: var(--shadow-md)"
        >
          <span class="relative flex size-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style="background: var(--accent)" />
            <span class="relative inline-flex size-2 rounded-full" style="background: var(--accent)" />
          </span>
          <span class="text-[0.65rem] font-medium tracking-[0.16em] uppercase" style="color: var(--foreground)">
            {{ profile.available ? t('hero.available') : t('hero.unavailable') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Indicador de scroll -->
    <button
      class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 transition-colors duration-300 hover:text-[color:var(--accent)]"
      style="color: var(--muted-foreground)"
      :aria-label="t('common.scroll')"
      @click="scrollToNext"
    >
      <span class="text-[0.6rem] tracking-[0.3em] uppercase">{{ t('common.scroll') }}</span>
      <ChevronDown :size="16" class="animate-bounce" />
    </button>
  </section>
</template>
