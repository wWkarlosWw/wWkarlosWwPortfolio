import type { Directive } from 'vue'

interface MagneticState {
  move: (e: PointerEvent) => void
  leave: () => void
}

const states = new WeakMap<HTMLElement, MagneticState>()

/**
 * `v-magnetic` — el elemento se inclina hacia el cursor cuando pasa cerca,
 * como una hoja que sigue la brisa, y vuelve a su sitio al salir.
 *
 * Uso: `v-magnetic` o `v-magnetic="0.4"` (fuerza, de 0 a 1).
 * Solo actúa con ratón: en pantallas táctiles no hay cursor que seguir.
 */
export const vMagnetic: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return

    const strength = binding.value ?? 0.3

    // `translate` es independiente de `transform`: así no pisa el hover de `.btn`
    // y basta con sumar su transición a las que el elemento ya tenía.
    const base = getComputedStyle(el).transition
    const withTranslate = (ms: number) =>
      `${base && base !== 'all 0s ease 0s' ? `${base}, ` : ''}translate ${ms}ms var(--ease-out-soft)`

    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      el.style.transition = withTranslate(250)
      el.style.translate = `${x * strength}px ${y * strength}px`
    }

    const leave = () => {
      el.style.transition = withTranslate(800)
      el.style.translate = ''
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    states.set(el, { move, leave })
  },

  unmounted(el) {
    const state = states.get(el)
    if (!state) return
    el.removeEventListener('pointermove', state.move)
    el.removeEventListener('pointerleave', state.leave)
    el.style.transition = ''
    el.style.translate = ''
    states.delete(el)
  },
}
