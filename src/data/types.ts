/** Texto que existe en los dos idiomas del sitio. */
export interface Localized {
  es: string
  en: string
}

export type ProjectKind = 'personal' | 'freelance' | 'work'

export interface Project {
  /** Identificador estable, usado también como semilla de la portada generada. */
  slug: string
  kind: ProjectKind
  title: string
  /** Cliente, empresa o "Personal". */
  client?: Localized
  /** Etiqueta corta que se pinta sobre la portada. */
  category: Localized
  summary: Localized
  description: Localized
  /** Aportes concretos; se listan como viñetas en el detalle. */
  highlights?: Localized[]
  tags: string[]
  period?: string
  repo?: string
  demo?: string
  /** Destacado en la portada de Inicio. */
  featured?: boolean
}

export interface ExperienceEntry {
  slug: string
  role: Localized
  org: string
  location: string
  period: Localized
  /** `true` mientras siga en curso. */
  current?: boolean
  description: Localized
  achievements: Localized[]
  tags: string[]
}

export interface EducationEntry {
  slug: string
  title: Localized
  org: string
  period: string
  detail?: Localized
}

export interface SkillGroup {
  key: string
  name: Localized
  items: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readingTime: number
  lang: string
  body: string
}
