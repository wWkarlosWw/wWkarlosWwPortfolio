import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale } = useI18n()

  function init() {
    const saved = localStorage.getItem('lang')
    if (saved) locale.value = saved
  }

  function toggle() {
    locale.value = locale.value === 'es' ? 'en' : 'es'
    localStorage.setItem('lang', locale.value)
  }

  return { locale, init, toggle }
}
