import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Localized } from '@/data/types'

/**
 * Puente entre los datos tipados de `src/data` y el idioma activo.
 *
 * Los objetos `Localized` viven fuera de vue-i18n porque llevan estructura
 * (etiquetas, enlaces, fechas) y no solo texto. `L()` los resuelve de forma
 * reactiva: al cambiar el idioma, todo lo que dependa de él se vuelve a pintar.
 */
export function useLocalized() {
  const { locale } = useI18n()

  const lang = computed<'es' | 'en'>(() => (locale.value === 'en' ? 'en' : 'es'))

  function L(value: Localized | undefined): string {
    if (!value) return ''
    return value[lang.value] ?? value.es
  }

  return { lang, L }
}
