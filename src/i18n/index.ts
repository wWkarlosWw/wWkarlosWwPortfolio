import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'

const savedLang = localStorage.getItem('lang') || 'es'

export default createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: 'en',
  messages: { en, es },
})
