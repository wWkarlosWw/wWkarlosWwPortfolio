<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight, Mail } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { useLocalized } from '@/composables/useT'
import { kindLabels, projectKinds } from '@/data/projects'
import { profile } from '@/data/profile'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import WkLogoIcon from '@/components/ui/WkLogoIcon.vue'
import photoHome from '@/assets/img/k1.jpeg'
import photoAbout from '@/assets/img/k8.jpeg'
import photoProjects from '@/assets/img/k7.jpeg'
import photoContact from '@/assets/img/k3.jpeg'

/**
 * Barra superior y menú a pantalla completa.
 *
 * Arriba solo hay lo esencial: el nombre apilado a la izquierda, el emblema al
 * centro y, a la derecha, el idioma, la llamada a conversar y el botón del
 * menú. Al bajar la barra se esconde para no tapar la lectura y vuelve en
 * cuanto el visitante sube un poco.
 *
 * La barra adopta el tono de la sección que tiene debajo (papel, noche o
 * bosque), así siempre contrasta sin necesidad de un modo claro u oscuro.
 *
 * El menú es siempre de bosque: un verde profundo, liso, sin adornos. A la izquierda, una foto por sección que se aviva
 * al pasar por su enlace; a la derecha, los enlaces en grande.
 */
const { t } = useI18n()
const { L } = useLocalized()
const locale = useLocale()
const route = useRoute()

const navItems = ['home', 'about', 'projects', 'contact'] as const
type NavItem = (typeof navItems)[number]

const photos: Record<NavItem, string> = {
  home: photoHome,
  about: photoAbout,
  projects: photoProjects,
  contact: photoContact,
}

const socials = [
  { name: 'github' as const, href: profile.github, label: 'GitHub' },
  { name: 'linkedin' as const, href: profile.linkedin, label: 'LinkedIn' },
  { name: 'whatsapp' as const, href: `https://wa.me/${profile.whatsapp}`, label: 'WhatsApp' },
]

const open = ref(false)
const hovered = ref<NavItem | null>(null)
const scrolled = ref(false)
const hidden = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const firstLink = ref<HTMLElement | null>(null)

/** La ruta activa incluye a los hijos: /blog/x marca "Sobre Mí". */
const activeName = computed(() => {
  if (route.name === 'blog-post') return 'about'
  if (route.name === 'project') return 'projects'
  return route.name as string
})

/** Foto destacada: la del enlace bajo el cursor o, si no hay, la de la página actual. */
const focusPhoto = computed<NavItem>(() => {
  if (hovered.value) return hovered.value
  return (navItems as readonly string[]).includes(activeName.value) ? (activeName.value as NavItem) : 'home'
})

/* --- Tono de la sección bajo la barra ------------------------------------ */
type Tone = 'light' | 'dark' | 'forest'
const tone = ref<Tone>('light')
const header = ref<HTMLElement | null>(null)

function detectTone() {
  const y = (header.value?.offsetHeight ?? 72) / 2
  for (const el of document.elementsFromPoint(window.innerWidth / 2, y)) {
    if (header.value?.contains(el)) continue
    const section = el.closest<HTMLElement>('.tone-light, .tone-dark, .tone-forest')
    if (!section) continue
    tone.value = section.classList.contains('tone-dark')
      ? 'dark'
      : section.classList.contains('tone-forest')
        ? 'forest'
        : 'light'
    return
  }
  tone.value = 'light'
}

/* --- Barra que se esconde al bajar ------------------------------------- */
let lastY = 0
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    scrolled.value = y > 60
    detectTone()
    // Un margen de 6 px evita que tiemble con el desplazamiento inercial del trackpad.
    if (Math.abs(y - lastY) > 6) {
      hidden.value = y > lastY && y > 240 && !open.value
      lastY = y
    }
    ticking = false
  })
}

/* --- Menú ------------------------------------------------------------------ */
function toggleMenu() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    close()
    menuButton.value?.focus()
  }
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  hovered.value = null
  if (isOpen) {
    hidden.value = false
    nextTick(() => firstLink.value?.focus({ preventScroll: true }))
  }
})

watch(() => route.fullPath, () => {
  close()
  // La vista nueva entra con una transición: se mira el tono cuando ya está.
  window.setTimeout(detectTone, 650)
})

onMounted(() => {
  locale.init()
  lastY = window.scrollY
  scrolled.value = lastY > 60
  detectTone()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

/** Con el menú abierto el fondo es siempre bosque, así que todo va en crema. */
const ink = computed(() => (open.value ? 'var(--cream)' : 'var(--foreground)'))
</script>

<template>
  <header
    ref="header"
    class="fixed inset-x-0 top-0 z-50 bg-transparent transition-transform duration-700"
    style="transition-timing-function: var(--ease-out-soft)"
    :class="[hidden ? '-translate-y-full' : 'translate-y-0', `tone-${tone}`]"
  >
    <!-- Fondo liso del tono de la sección: solo cuando ya bajamos y el menú está cerrado -->
    <div
      class="absolute inset-0 border-b transition-opacity duration-500"
      style="background: var(--background); border-color: var(--border)"
      :class="scrolled && !open ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    />

    <nav
      class="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 sm:px-8 sm:py-4"
      :aria-label="t('nav.menu')"
    >
      <!-- Nombre apilado -->
      <RouterLink
        to="/"
        class="wordmark justify-self-start transition-colors duration-500"
        :style="{ color: ink }"
        aria-label="Karlos Batista"
        @click="close"
      >
        <span class="wordmark-top">Karlos</span>
        <span class="wordmark-bottom">Batista</span>
      </RouterLink>

      <!-- Emblema central -->
      <RouterLink
        to="/"
        class="emblem flex size-10 items-center justify-center transition-colors duration-500 sm:size-11 [&>svg]:block [&>svg]:size-full"
        :style="{ color: open ? 'var(--gold-400)' : ink }"
        tabindex="-1"
        aria-hidden="true"
        @click="close"
      >
        <WkLogoIcon />
      </RouterLink>

      <!-- Controles -->
      <div class="flex items-center gap-2 justify-self-end">
        <button
          class="nav-square cursor-pointer text-[0.66rem] font-bold tracking-[0.14em]"
          :style="{ color: ink }"
          :title="t('nav.language')"
          :aria-label="t('nav.language')"
          @click="locale.toggle()"
        >
          {{ locale.locale.value === 'es' ? 'EN' : 'ES' }}
        </button>

        <RouterLink
          v-magnetic="0.2"
          :to="{ name: 'contact' }"
          class="btn btn-green nav-cta hidden !px-5 !py-3 sm:inline-flex"
          @click="close"
        >
          {{ t('nav.cta') }}
          <ArrowUpRight :size="14" />
        </RouterLink>

        <button
          ref="menuButton"
          class="nav-square menu-toggle cursor-pointer"
          :class="{ 'is-open': open }"
          :style="{ color: open ? 'var(--ink)' : ink }"
          :aria-label="open ? t('nav.close') : t('nav.menu')"
          :aria-expanded="open"
          aria-controls="site-menu"
          @click="toggleMenu"
        >
          <span class="menu-line menu-line-top" />
          <span class="menu-line menu-line-bottom" />
        </button>
      </div>
    </nav>
  </header>

  <!-- ================= Menú a pantalla completa ================= -->
  <Teleport to="body">
    <Transition name="curtain">
      <div
        v-if="open"
        id="site-menu"
        class="fixed inset-0 z-40 overflow-y-auto"
        style="background: var(--forest-900); color: var(--cream)"
        role="dialog"
        aria-modal="true"
        :aria-label="t('nav.menu')"
      >
        <div class="relative grid min-h-full lg:h-full lg:grid-cols-[1fr_1.05fr] lg:grid-rows-1 lg:overflow-hidden">
          <!-- Fotos: una por sección -->
          <div class="hidden h-full grid-cols-2 grid-rows-2 gap-4 px-8 pb-8 pt-24 lg:grid" aria-hidden="true">
            <div
              v-for="(item, i) in navItems"
              :key="item"
              class="menu-photo relative overflow-hidden rounded-[var(--radius-xl)]"
              :class="{ 'is-focus': focusPhoto === item }"
              :style="{ animationDelay: `${180 + i * 90}ms` }"
            >
              <img :src="photos[item]" alt="" class="absolute inset-0 h-full w-full object-cover" />
              <span class="absolute bottom-3 left-4 text-[0.6rem] tracking-[0.3em] uppercase">
                0{{ i + 1 }} · {{ t(`nav.${item}`) }}
              </span>
            </div>
          </div>

          <!-- Enlaces -->
          <div class="flex flex-col justify-center px-6 pb-10 pt-28 sm:px-12 lg:h-full lg:items-center lg:px-10 lg:pb-8 lg:pt-24 lg:text-center">
            <p class="eyebrow mb-4 !text-[color:var(--gold-400)]">{{ t('nav.explore') }}</p>

            <ul class="flex flex-col">
              <li v-for="(item, i) in navItems" :key="item" class="overflow-hidden">
                <RouterLink
                  :ref="(el) => { if (i === 0) firstLink = (el as { $el?: HTMLElement } | null)?.$el ?? null }"
                  :to="{ name: item }"
                  class="menu-link group relative inline-block"
                  :class="{ 'is-active': activeName === item }"
                  :style="{ animationDelay: `${260 + i * 70}ms` }"
                  :aria-current="activeName === item ? 'page' : undefined"
                  @mouseenter="hovered = item"
                  @mouseleave="hovered = null"
                  @focus="hovered = item"
                  @click="close"
                >
                  {{ t(`nav.${item}`) }}
                </RouterLink>
              </li>
            </ul>

            <!-- Tipos de proyecto -->
            <div class="menu-fade mt-6" style="animation-delay: 560ms">
              <p class="text-[0.6rem] tracking-[0.3em] uppercase" style="color: rgba(245, 241, 232, 0.5)">
                {{ t('nav.projectTypes') }}
              </p>
              <div class="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:justify-center">
                <RouterLink
                  v-for="kind in projectKinds"
                  :key="kind"
                  :to="{ name: 'projects', query: { tipo: kind } }"
                  class="link-underline text-sm transition-colors duration-300 hover:text-[color:var(--gold-400)]"
                  style="color: rgba(245, 241, 232, 0.8)"
                  @click="close"
                >
                  {{ L(kindLabels[kind]) }}
                </RouterLink>
              </div>
            </div>

            <!-- Emblema -->
            <div class="menu-fade mt-8 flex flex-col gap-2 lg:items-center" style="animation-delay: 640ms">
              <div class="w-12" style="color: var(--gold-400)"><WkLogoIcon /></div>
              <p class="text-[0.58rem] tracking-[0.3em] uppercase" style="color: rgba(245, 241, 232, 0.55)">
                {{ t('nav.emblem') }} {{ profile.startYear }}
              </p>
            </div>

            <!-- Redes e idioma -->
            <div
              class="menu-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:justify-center"
              style="animation-delay: 720ms"
            >
              <a
                v-for="s in socials"
                :key="s.name"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-[0.65rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[color:var(--gold-400)]"
                style="color: rgba(245, 241, 232, 0.85)"
              >
                <BrandIcon :name="s.name" :size="14" />
                {{ s.label }}
              </a>
              <a
                :href="`mailto:${profile.email}`"
                class="flex items-center gap-2 text-[0.65rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[color:var(--gold-400)]"
                style="color: rgba(245, 241, 232, 0.85)"
              >
                <Mail :size="14" />
                Email
              </a>

              <span class="hidden h-4 w-px sm:block" style="background: rgba(232, 198, 91, 0.3)" />

              <button
                class="flex cursor-pointer items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.2em]"
                :aria-label="t('nav.language')"
                @click="locale.toggle()"
              >
                <span :style="{ color: locale.locale.value === 'es' ? 'var(--gold-400)' : 'rgba(245,241,232,0.45)' }">ES</span>
                <span style="color: rgba(245, 241, 232, 0.3)">/</span>
                <span :style="{ color: locale.locale.value === 'en' ? 'var(--gold-400)' : 'rgba(245,241,232,0.45)' }">EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* --- Nombre apilado: fino arriba, rotundo abajo ------------------------- */
.wordmark {
  display: flex;
  flex-direction: column;
  line-height: 0.82;
  text-transform: uppercase;
}
.wordmark-top {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.55rem;
  letter-spacing: 0.04em;
}
.wordmark-bottom {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.22rem;
  letter-spacing: -0.02em;
}
@media (min-width: 640px) {
  .wordmark-top { font-size: 1.9rem; }
  .wordmark-bottom { font-size: 1.48rem; }
}

.emblem :deep(svg) {
  transition: transform 0.8s var(--ease-out-soft);
}
.emblem:hover :deep(svg) {
  transform: rotate(-8deg) scale(1.08);
}

/* Llamada de la barra: sin destello ni resplandor al pasar el cursor, solo el color */
.nav-cta {
  font-weight: 700;
}
.nav-cta::after {
  display: none;
}
.nav-cta:hover {
  box-shadow: none;
  transform: none;
}

/* --- Botones cuadrados ---------------------------------------------------- */
.nav-square {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1.5px solid color-mix(in srgb, currentColor 55%, transparent);
  border-radius: var(--radius-md, 4px);
  transition:
    background-color 0.4s var(--ease-out-soft),
    border-color 0.4s var(--ease-out-soft),
    color 0.4s var(--ease-out-soft);
}
.nav-square:hover {
  border-color: var(--accent);
}

/* Dos líneas desiguales que se cruzan en una X al abrir */
.menu-line {
  position: absolute;
  height: 2px;
  background: currentColor;
  transition:
    transform 0.6s var(--ease-out-soft),
    width 0.5s var(--ease-out-soft),
    top 0.5s var(--ease-out-soft);
}
.menu-line-top {
  top: 17px;
  right: 12px;
  width: 18px;
}
.menu-line-bottom {
  top: 24px;
  right: 12px;
  width: 10px;
}
.menu-toggle:hover .menu-line-bottom {
  width: 18px;
}
.menu-toggle.is-open {
  background: var(--gold-400);
  border-color: var(--gold-400);
}
.menu-toggle.is-open .menu-line {
  top: 20.5px;
  width: 18px;
}
.menu-toggle.is-open .menu-line-top {
  transform: rotate(45deg);
}
.menu-toggle.is-open .menu-line-bottom {
  transform: rotate(-45deg);
}

/* --- Telón del menú --------------------------------------------------------- */
.curtain-enter-active {
  transition: clip-path 0.8s var(--ease-in-out-soft);
}
.curtain-leave-active {
  transition: clip-path 0.6s var(--ease-in-out-soft);
}
.curtain-enter-from,
.curtain-leave-to {
  clip-path: inset(0 0 100% 0);
}
.curtain-enter-to,
.curtain-leave-from {
  clip-path: inset(0 0 0 0);
}

/* --- Fotos ----------------------------------------------------------------- */
/* Rejilla 2×2 que llena la altura de la pantalla: nada queda por debajo */
.menu-photo {
  height: 100%;
  width: 100%;
  animation: photo-reveal 1.1s var(--ease-in-out-soft) both;
}
.menu-photo img {
  filter: grayscale(1) sepia(0.25) brightness(0.62);
  transform: scale(1.08);
  transition:
    filter 0.8s var(--ease-out-soft),
    transform 1.2s var(--ease-out-soft);
}
.menu-photo span {
  color: rgba(245, 241, 232, 0.55);
  transition: color 0.6s var(--ease-out-soft);
}
.menu-photo.is-focus img {
  filter: grayscale(0) sepia(0) brightness(0.95);
  transform: scale(1);
}
.menu-photo.is-focus span {
  color: var(--gold-400);
}

@keyframes photo-reveal {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0 0); }
}

/* --- Enlaces ----------------------------------------------------------------- */
.menu-link {
  font-family: var(--font-sans);
  font-weight: 800;
  font-stretch: 90%;
  text-transform: uppercase;
  font-size: clamp(2.5rem, 8.5vh, 6rem);
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: var(--cream);
  animation: link-rise 0.9s var(--ease-out-soft) both;
  transition: color 0.4s var(--ease-out-soft);
}
.menu-link:hover,
.menu-link:focus-visible {
  color: var(--forest-300);
}
.menu-link.is-active {
  color: rgba(245, 241, 232, 0.4);
}
.menu-link.is-active:hover {
  color: rgba(245, 241, 232, 0.6);
}

/* Página actual: tachada por un filo dorado que se traza solo */
.menu-link.is-active::after {
  content: "";
  position: absolute;
  left: -3%;
  right: -3%;
  top: 50%;
  height: 2px;
  background: var(--gold-400);
  transform: scaleX(0);
  transform-origin: left;
  animation: strike 0.9s var(--ease-out-soft) 0.75s forwards;
}

@keyframes link-rise {
  from { transform: translateY(105%); }
  to   { transform: none; }
}
@keyframes strike {
  to { transform: scaleX(1); }
}

.menu-fade {
  animation: fade-up 0.8s var(--ease-out-soft) both;
}

@media (prefers-reduced-motion: reduce) {
  .menu-link.is-active::after { transform: none; }
}
</style>
