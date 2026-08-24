import type { Directive, DirectiveBinding } from 'vue'

interface RevealOptions {
  /** Retardo en milisegundos antes de mostrar el elemento. */
  delay?: number
  /** Fracción visible necesaria para disparar. */
  threshold?: number
  /** Repetir la animación cada vez que el elemento vuelve a entrar. */
  repeat?: boolean
}

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

function parse(binding: DirectiveBinding): RevealOptions {
  if (typeof binding.value === 'number') return { delay: binding.value }
  return binding.value ?? {}
}

/**
 * `v-reveal` — aparición suave al entrar en el viewport.
 *
 * Uso: `v-reveal`, `v-reveal="120"` (retardo) o `v-reveal="{ delay: 200 }"`.
 * Si el usuario pidió menos movimiento, el elemento se muestra de inmediato.
 */
export const vReveal: Directive<HTMLElement> = {
  mounted(el, binding) {
    const opts = parse(binding)

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal-in')
      return
    }

    el.classList.add('reveal-init')
    if (opts.delay) el.style.transitionDelay = `${opts.delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal-in')
            if (!opts.repeat) observer.unobserve(el)
          } else if (opts.repeat) {
            el.classList.remove('reveal-in')
          }
        }
      },
      {
        threshold: opts.threshold ?? 0.12,
        // Dispara un poco antes de que el borde inferior toque el elemento.
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(el)
    observers.set(el, observer)
  },

  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
