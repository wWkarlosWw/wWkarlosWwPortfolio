import { parseFrontmatter, readingTime, renderMarkdown } from '@/lib/markdown'
import type { BlogPost } from './types'

/**
 * Blog basado en archivos. Cualquier `.md` que se deje en
 * `src/content/blog/` aparece automáticamente en el listado, ordenado por
 * fecha descendente. El nombre del archivo determina la URL.
 *
 * Convención de nombre: `mi-articulo.md` o `mi-articulo.en.md` para la
 * versión en inglés del mismo artículo.
 */
const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function toStr(v: string | string[] | undefined, fallback = ''): string {
  if (Array.isArray(v)) return v.join(', ')
  return v ?? fallback
}

function toArr(v: string | string[] | undefined): string[] {
  if (Array.isArray(v)) return v
  if (!v) return []
  return v.split(',').map((s) => s.trim()).filter(Boolean)
}

export const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const file = path.split('/').pop()!.replace(/\.md$/, '')
    // `titulo.en` → slug `titulo`, idioma `en`
    const langMatch = /\.(es|en)$/.exec(file)
    const lang = langMatch?.[1] ?? 'es'
    const slug = langMatch ? file.slice(0, -3) : file

    const { data, body } = parseFrontmatter(raw)

    return {
      slug: toStr(data.slug) || slug,
      title: toStr(data.title, slug),
      date: toStr(data.date, '1970-01-01'),
      excerpt: toStr(data.excerpt),
      tags: toArr(data.tags),
      readingTime: readingTime(body),
      lang: toStr(data.lang) || lang,
      body,
    } satisfies BlogPost
  })
  .sort((a, b) => b.date.localeCompare(a.date))

/** Entradas del idioma pedido; si no hay ninguna, cae al español. */
export function postsFor(lang: string): BlogPost[] {
  const matching = posts.filter((p) => p.lang === lang)
  return matching.length ? matching : posts.filter((p) => p.lang === 'es')
}

export function findPost(slug: string, lang: string): BlogPost | undefined {
  return (
    posts.find((p) => p.slug === slug && p.lang === lang) ??
    posts.find((p) => p.slug === slug)
  )
}

export function renderPost(post: BlogPost): string {
  return renderMarkdown(post.body)
}

/** Fecha larga y legible: "14 de marzo de 2026". */
export function formatDate(iso: string, lang: string): string {
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
