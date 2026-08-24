import { computed, reactive, ref } from 'vue'
import { profile } from '@/data/profile'

export type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Envío del formulario de contacto.
 *
 * Usa Web3Forms: un POST desde el navegador y el mensaje llega al correo de
 * Karlos, sin servidor propio. La clave se lee de `VITE_WEB3FORMS_KEY`.
 *
 * Si la clave no está configurada, el formulario no se rompe: cae a `mailto:`
 * con todos los campos ya rellenados. Así el sitio funciona recién clonado.
 */
const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export interface ContactFields {
  name: string
  email: string
  subject: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function useContactForm() {
  const fields = reactive<ContactFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const status = ref<FormStatus>('idle')
  const touched = reactive<Record<keyof ContactFields, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  })

  const errors = computed(() => ({
    name: fields.name.trim().length < 2 ? 'required' : '',
    email: !EMAIL_RE.test(fields.email.trim()) ? 'invalidEmail' : '',
    subject: '',
    message: fields.message.trim().length < 10 ? 'required' : '',
  }))

  const isValid = computed(() => !Object.values(errors.value).some(Boolean))

  /** Muestra el error solo cuando el campo ya fue tocado. */
  function errorFor(field: keyof ContactFields): string {
    return touched[field] ? errors.value[field] : ''
  }

  function touch(field: keyof ContactFields) {
    touched[field] = true
  }

  function reset() {
    fields.name = ''
    fields.email = ''
    fields.subject = ''
    fields.message = ''
    for (const key of Object.keys(touched) as Array<keyof ContactFields>) {
      touched[key] = false
    }
  }

  function mailtoFallback() {
    const subject = fields.subject.trim() || `Contacto desde el portafolio — ${fields.name}`
    const body = `${fields.message}\n\n—\n${fields.name}\n${fields.email}`
    window.location.href =
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
  }

  async function submit() {
    for (const key of Object.keys(touched) as Array<keyof ContactFields>) {
      touched[key] = true
    }
    if (!isValid.value || status.value === 'sending') return

    if (!ACCESS_KEY) {
      mailtoFallback()
      status.value = 'sent'
      setTimeout(() => (status.value = 'idle'), 5000)
      return
    }

    status.value = 'sending'

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: fields.name,
          email: fields.email,
          subject: fields.subject.trim() || `Portafolio — mensaje de ${fields.name}`,
          message: fields.message,
          from_name: 'Portafolio wWkarlosWw',
          // Honeypot de Web3Forms: si un bot lo rellena, el envío se descarta.
          botcheck: '',
        }),
      })

      const result = await response.json().catch(() => ({ success: false }))

      if (response.ok && result.success) {
        status.value = 'sent'
        reset()
        setTimeout(() => (status.value = 'idle'), 6000)
      } else {
        status.value = 'error'
      }
    } catch {
      status.value = 'error'
    }
  }

  return { fields, status, errors, errorFor, touch, isValid, submit, reset }
}
