import type { Localized } from './types'

/**
 * Datos personales verificados: CV (context/CV_KarlosBatistaES.pdf),
 * perfil de GitHub @wWkarlosWw y LinkedIn.
 */
export const profile = {
  name: 'Karlos Batista',
  fullName: 'Karlos Batista Leite Cardozo',
  handle: 'wWkarlosWw',
  role: {
    es: 'Full Stack Developer · QA',
    en: 'Full Stack Developer · QA',
  } satisfies Localized,
  location: {
    es: 'Cochabamba, Bolivia',
    en: 'Cochabamba, Bolivia',
  } satisfies Localized,
  timezone: 'GMT-4',
  email: 'batistaleitecardozokarlos@gmail.com',
  phone: '+591 75904262',
  /** Solo dígitos: formato que exige la API de wa.me */
  whatsapp: '59175904262',
  github: 'https://github.com/wWkarlosWw',
  linkedin: 'https://www.linkedin.com/in/karlos-batista-leite-cardozo-a7b502271/',
  twitter: 'https://twitter.com/wWkarlosWw',
  cv: '/CV_KarlosBatistaES.pdf',
  /** Año en que empezó a programar de forma seria (Unifranz + primeros freelance). */
  startYear: 2023,
  available: true,
}

export interface ContactChannel {
  key: string
  label: Localized
  value: string
  href: string
  icon: 'mail' | 'whatsapp' | 'linkedin' | 'github' | 'phone' | 'map'
  /** Se abre fuera del sitio. */
  external?: boolean
}

export const contactChannels: ContactChannel[] = [
  {
    key: 'email',
    label: { es: 'Correo', en: 'Email' },
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
  },
  {
    key: 'whatsapp',
    label: { es: 'WhatsApp', en: 'WhatsApp' },
    value: profile.phone,
    href: `https://wa.me/${profile.whatsapp}`,
    icon: 'whatsapp',
    external: true,
  },
  {
    key: 'linkedin',
    label: { es: 'LinkedIn', en: 'LinkedIn' },
    value: 'Karlos Batista Leite Cardozo',
    href: profile.linkedin,
    icon: 'linkedin',
    external: true,
  },
  {
    key: 'github',
    label: { es: 'GitHub', en: 'GitHub' },
    value: `@${profile.handle}`,
    href: profile.github,
    icon: 'github',
    external: true,
  },
]

export const languages: Array<{ name: Localized; level: Localized; value: number }> = [
  {
    name: { es: 'Español', en: 'Spanish' },
    level: { es: 'Nativo', en: 'Native' },
    value: 100,
  },
  {
    name: { es: 'Inglés', en: 'English' },
    level: { es: 'A2 — Básico', en: 'A2 — Elementary' },
    value: 40,
  },
  {
    name: { es: 'Portugués', en: 'Portuguese' },
    level: { es: 'Básico', en: 'Basic' },
    value: 30,
  },
]
