<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ChevronDown, Languages, Menu, Moon, Sun, X } from '@lucide/vue'
import { useThemeStore } from '@/stores/theme'
import { useLocale } from '@/composables/useLocale'
import { useLocalized } from '@/composables/useT'
import { kindLabels, projectKinds } from '@/data/projects'
import woodBg from '@/assets/img/navMadera.jpg'
import WkLogoIcon from '@/components/ui/WkLogoIcon.vue'

const { t } = useI18n()
const { L } = useLocalized()
const theme = useThemeStore()
const locale = useLocale()
const route = useRoute()

const navItems = ['home', 'about', 'projects', 'contact'] as const

const scrolled = ref(false)
const mobileOpen = ref(false)
const projectsOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | undefined

function onScroll() {
  scrolled.value = window.scrollY > 60
}

/** La ruta activa incluye a los hijos: /blog/x marca "Sobre Mí". */
const activeName = computed(() => {
  if (route.name === 'blog-post') return 'about'
  return route.name as string
})

/* --- Submenú de Proyectos ------------------------------------------------
   En escritorio abre al pasar el cursor, con un pequeño retardo al salir para
   que no se cierre mientras se cruza el hueco entre el botón y el panel. */
function openProjects() {
  clearTimeout(closeTimer)
  projectsOpen.value = true
}

function closeProjects(delay = 140) {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => (projectsOpen.value = false), delay)
}

/**
 * Cierra los menús al pulsar un enlace.
 *
 * La navegación la hace el propio `<RouterLink>`: antes eran botones con
 * `router.push`, así que el enlace no existía como tal y no se podía abrir en
 * otra pestaña, copiar la dirección ni rastrear desde fuera. El cierre va
 * aparte porque si el destino coincide con la ruta actual no hay navegación
 * y el `watch` sobre `route.fullPath` nunca llega a dispararse.
 */
function closeMenus() {
  projectsOpen.value = false
  mobileOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Escape') return
  projectsOpen.value = false
  mobileOpen.value = false
}

// Bloquear el scroll del fondo mientras el menú móvil está abierto.
watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(() => route.fullPath, () => {
  mobileOpen.value = false
  projectsOpen.value = false
})

onMounted(() => {
  theme.init()
  locale.init()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  clearTimeout(closeTimer)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

/**
 * La píldora usa madera real en tema oscuro y vidrio crema en tema claro:
 * la textura de madera sobre fondo claro ensuciaría la lectura.
 */
const pillStyle = computed(() => {
  if (theme.isDark) {
    return {
      background: `linear-gradient(rgba(28, 18, 10, 0.55), rgba(28, 18, 10, 0.62)), url(${woodBg}) center / cover no-repeat`,
      backdropFilter: 'blur(14px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
      border: '1px solid rgba(232, 198, 91, 0.22)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.45)',
    }
  }
  return {
    background: 'rgba(250, 248, 242, 0.86)',
    backdropFilter: 'blur(16px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(16px) saturate(1.5)',
    border: '1px solid rgba(28, 69, 53, 0.14)',
    boxShadow: '0 8px 32px rgba(28, 69, 53, 0.10)',
  }
})

/** Sobre madera el texto siempre va claro; sin píldora sigue al tema. */
const onPill = computed(() => scrolled.value && theme.isDark)
</script>

<template>
  <nav
    class="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 sm:top-5"
    :aria-label="t('nav.menu')"
  >
    <!-- Fondo de la píldora: aparece al hacer scroll -->
    <div
      class="absolute inset-0 rounded-full transition-all duration-500 ease-out"
      :class="scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'"
      :style="pillStyle"
    />

    <div class="relative z-10 flex items-center justify-between gap-4 px-4 py-2 sm:px-6">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex size-11 shrink-0 items-center justify-center overflow-hidden transition-all duration-500 [&>svg]:block [&>svg]:size-full"
        :class="onPill ? 'text-cream' : 'text-[color:var(--foreground)]'"
        :style="{ filter: scrolled ? 'none' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }"
        aria-label="Karlos Batista"
      >
        <WkLogoIcon />
      </RouterLink>

      <!-- Navegación de escritorio -->
      <div class="hidden items-center gap-1 md:flex">
        <template v-for="item in navItems" :key="item">
          <!-- Proyectos: botón con submenú -->
          <div
            v-if="item === 'projects'"
            class="relative"
            @mouseenter="openProjects"
            @mouseleave="closeProjects()"
          >
            <RouterLink
              :to="{ name: 'projects' }"
              class="group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
              :class="[
                activeName === item
                  ? 'text-[color:var(--accent)]'
                  : onPill
                    ? 'text-cream/75 hover:text-gold-400'
                    : 'text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]',
              ]"
              :aria-expanded="projectsOpen"
              aria-haspopup="true"
              @click="closeMenus"
              @focus="openProjects"
            >
              {{ t(`nav.${item}`) }}
              <ChevronDown
                :size="13"
                class="transition-transform duration-300"
                :class="projectsOpen ? 'rotate-180' : ''"
              />
            </RouterLink>

            <!-- Panel del submenú -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-[0.97]"
              leave-active-class="transition duration-200 ease-in"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="projectsOpen"
                class="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                @mouseenter="openProjects"
                @mouseleave="closeProjects()"
              >
                <div
                  class="overflow-hidden rounded-md p-1.5"
                  :style="{
                    background: 'var(--card)',
                    border: '1px solid var(--border-strong)',
                    boxShadow: 'var(--shadow-lg)',
                  }"
                >
                  <RouterLink
                    v-for="kind in projectKinds"
                    :key="kind"
                    :to="{ name: 'projects', query: { tipo: kind } }"
                    class="group flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm transition-colors duration-200"
                    style="color: var(--muted-foreground)"
                    @click="closeMenus"
                  >
                    <span
                      class="h-1 w-1 shrink-0 rounded-full transition-all duration-300 group-hover:w-4"
                      style="background: var(--accent)"
                    />
                    <span class="transition-colors group-hover:text-[color:var(--foreground)]">
                      {{ L(kindLabels[kind]) }}
                    </span>
                  </RouterLink>

                  <div class="gold-rule my-1.5" />

                  <RouterLink
                    :to="{ name: 'projects' }"
                    class="block w-full rounded-sm px-3 py-2 text-left text-xs tracking-[0.18em] uppercase transition-colors duration-200 hover:text-[color:var(--accent)]"
                    style="color: var(--muted-foreground)"
                    @click="closeMenus"
                  >
                    {{ t('projects.all') }}
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Resto de enlaces -->
          <RouterLink
            v-else
            :to="{ name: item }"
            class="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
            :class="[
              activeName === item
                ? 'text-[color:var(--accent)]'
                : onPill
                  ? 'text-cream/75 hover:text-gold-400'
                  : 'text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]',
            ]"
            :aria-current="activeName === item ? 'page' : undefined"
            @click="closeMenus"
          >
            {{ t(`nav.${item}`) }}
            <span
              class="absolute inset-x-4 -bottom-0.5 h-px origin-center transition-transform duration-400"
              :class="activeName === item ? 'scale-x-100' : 'scale-x-0'"
              style="background: var(--accent)"
            />
          </RouterLink>
        </template>
      </div>

      <!-- Controles -->
      <div class="flex items-center gap-1">
        <button
          class="flex size-9 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
          :class="
            onPill
              ? 'text-cream/75 hover:bg-white/10 hover:text-gold-400'
              : 'text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--accent)]'
          "
          :title="t('nav.theme')"
          :aria-label="t('nav.theme')"
          @click="theme.toggle($event)"
        >
          <Transition
            mode="out-in"
            enter-active-class="transition duration-300"
            enter-from-class="opacity-0 rotate-90 scale-50"
            leave-active-class="transition duration-200"
            leave-to-class="opacity-0 -rotate-90 scale-50"
          >
            <Sun v-if="theme.isDark" :size="16" />
            <Moon v-else :size="16" />
          </Transition>
        </button>

        <button
          class="flex h-9 cursor-pointer items-center gap-1 rounded-full px-2.5 transition-all duration-300"
          :class="
            onPill
              ? 'text-cream/75 hover:bg-white/10 hover:text-gold-400'
              : 'text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--accent)]'
          "
          :title="t('nav.language')"
          :aria-label="t('nav.language')"
          @click="locale.toggle()"
        >
          <Languages :size="15" />
          <span class="text-[0.65rem] font-semibold tracking-wider uppercase">
            {{ locale.locale.value === 'es' ? 'ES' : 'EN' }}
          </span>
        </button>

        <!-- Disparador del menú móvil -->
        <button
          class="flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 md:hidden"
          :class="
            onPill
              ? 'text-cream/75 hover:text-gold-400'
              : 'text-[color:var(--muted-foreground)] hover:text-[color:var(--accent)]'
          "
          :aria-label="mobileOpen ? t('nav.close') : t('nav.menu')"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" :size="18" />
          <Menu v-else :size="18" />
        </button>
      </div>
    </div>
  </nav>

  <!-- ================= Menú móvil ================= -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-300 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 md:hidden"
        :style="{
          background: theme.isDark
            ? 'rgba(13, 26, 20, 0.97)'
            : 'rgba(250, 248, 242, 0.97)',
          backdropFilter: 'blur(20px)',
        }"
        @click.self="mobileOpen = false"
      >
        <div class="flex h-full flex-col justify-center px-8 pb-16">
          <nav class="flex flex-col gap-1">
            <template v-for="(item, i) in navItems" :key="item">
              <RouterLink
                :to="{ name: item }"
                class="group flex w-full items-baseline gap-4 border-b py-5 text-left transition-colors duration-300"
                style="border-color: var(--border)"
                :style="{ animation: `fade-up 0.5s var(--ease-out-soft) ${i * 60}ms both` }"
                :aria-current="activeName === item ? 'page' : undefined"
                @click="closeMenus"
              >
                <span class="numeric text-xs" style="color: var(--accent)">
                  0{{ i + 1 }}
                </span>
                <span
                  class="font-display text-4xl transition-colors duration-300"
                  :class="activeName === item ? 'text-[color:var(--accent)]' : ''"
                  style="color: var(--foreground)"
                >
                  {{ t(`nav.${item}`) }}
                </span>
              </RouterLink>

              <!-- Subcategorías bajo Proyectos -->
              <div
                v-if="item === 'projects'"
                class="flex flex-col gap-1 py-3 pl-8"
                :style="{ animation: `fade-up 0.5s var(--ease-out-soft) ${i * 60 + 40}ms both` }"
              >
                <RouterLink
                  v-for="kind in projectKinds"
                  :key="kind"
                  :to="{ name: 'projects', query: { tipo: kind } }"
                  class="flex items-center gap-3 py-1.5 text-left text-sm font-light transition-colors duration-200 hover:text-[color:var(--accent)]"
                  style="color: var(--muted-foreground)"
                  @click="closeMenus"
                >
                  <span class="h-px w-5" style="background: var(--accent); opacity: 0.6" />
                  {{ L(kindLabels[kind]) }}
                </RouterLink>
              </div>
            </template>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
