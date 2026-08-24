import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ThemeName = 'dark' | 'light'

const STORAGE_KEY = 'theme'
/** Duración de la transición global de color. Debe coincidir con main.css. */
const SWITCH_MS = 700

/**
 * El tema se aplica en `index.html` antes de pintar para evitar el destello
 * blanco al cargar. Este store solo lee lo que ya quedó en el `<html>` y se
 * encarga de los cambios posteriores.
 */
function currentFromDom(): ThemeName {
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'light' ? 'light' : 'dark'
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeName>(
    typeof document !== 'undefined' ? currentFromDom() : 'dark',
  )
  const isDark = ref(theme.value === 'dark')

  /** `true` mientras el visitante no haya elegido tema explícitamente. */
  const followsSystem = ref(
    typeof localStorage !== 'undefined' && !localStorage.getItem(STORAGE_KEY),
  )

  /**
   * Contador que se incrementa en cada cambio de tema. Los componentes que
   * quieren animar la transición (el héroe, por ejemplo) observan esto en vez
   * de `isDark`, así también reaccionan si el sistema cambia solo.
   */
  const pulse = ref(0)

  let switchTimer: number | undefined

  /**
   * Enciende la transición global de color durante `SWITCH_MS` y deja en el
   * `<html>` el punto desde el que se pidió el cambio, para que el destello del
   * héroe nazca justo debajo del botón.
   */
  function markTransition(origin?: { x: number; y: number }) {
    const root = document.documentElement
    root.style.setProperty('--theme-x', `${origin?.x ?? window.innerWidth / 2}px`)
    root.style.setProperty('--theme-y', `${origin?.y ?? window.innerHeight * 0.12}px`)

    if (prefersReducedMotion()) return

    root.classList.add('theme-switching')
    window.clearTimeout(switchTimer)
    switchTimer = window.setTimeout(() => root.classList.remove('theme-switching'), SWITCH_MS)
  }

  function apply(next: ThemeName, persist = true, origin?: { x: number; y: number }) {
    if (typeof document !== 'undefined') markTransition(origin)

    theme.value = next
    isDark.value = next === 'dark'
    pulse.value += 1
    document.documentElement.setAttribute('data-theme', next)

    if (persist) {
      localStorage.setItem(STORAGE_KEY, next)
      followsSystem.value = false
    }
  }

  /** `event` es opcional: si llega, el destello sale desde el botón pulsado. */
  function toggle(event?: MouseEvent) {
    const origin = event ? { x: event.clientX, y: event.clientY } : undefined
    apply(isDark.value ? 'light' : 'dark', true, origin)
  }

  function set(next: ThemeName) {
    apply(next)
  }

  function init() {
    // Sincroniza con lo que el script inline ya dejó puesto.
    const dom = currentFromDom()
    theme.value = dom
    isDark.value = dom === 'dark'

    // Si nunca eligió, seguir al sistema cuando este cambie.
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      if (followsSystem.value) apply(e.matches ? 'dark' : 'light', false)
    }
    mql.addEventListener('change', onChange)
  }

  return { theme, isDark, followsSystem, pulse, init, toggle, set }
})
