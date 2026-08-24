/**
 * Renderizador Markdown mínimo, suficiente para las entradas del blog.
 *
 * Se escribió a mano en lugar de añadir una dependencia porque el blog usa un
 * subconjunto acotado de Markdown y así el HTML resultante queda bajo control:
 * cada etiqueta lleva las clases del sistema de diseño.
 *
 * Soporta: encabezados, párrafos, listas, citas, bloques de código, código en
 * línea, negrita, cursiva, enlaces, imágenes y separadores.
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c)
}

/** Marcado en línea. Se aplica sobre texto ya escapado. */
function inline(text: string): string {
  return (
    text
      // `código`
      .replace(
        /`([^`]+)`/g,
        '<code class="rounded-sm px-1.5 py-0.5 text-[0.9em] font-mono" style="background:var(--muted);color:var(--accent)">$1</code>',
      )
      // ![alt](src)
      .replace(
        /!\[([^\]]*)\]\(([^)\s]+)\)/g,
        '<img src="$2" alt="$1" loading="lazy" class="my-8 w-full rounded-sm border" />',
      )
      // [texto](url)
      .replace(
        /\[([^\]]+)\]\(([^)\s]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="link-underline" style="color:var(--accent)">$1</a>',
      )
      // **negrita**
      .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--foreground);font-weight:600">$1</strong>')
      // *cursiva*
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  )
}

const HEADING_CLASSES: Record<number, string> = {
  1: 'font-display text-4xl mt-14 mb-5',
  2: 'font-display text-3xl mt-14 mb-4',
  3: 'font-display text-2xl mt-10 mb-3',
  4: 'text-lg font-semibold mt-8 mb-3',
}

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []

  /** Lectura segura: fuera de rango devuelve cadena vacía. */
  const at = (index: number): string => lines[index] ?? ''

  let i = 0
  while (i < lines.length) {
    const line = at(i)

    // Bloque de código cercado
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim()
      const buf: string[] = []
      i++
      while (i < lines.length && !/^```/.test(at(i))) {
        buf.push(at(i))
        i++
      }
      i++ // cierra el ```
      out.push(
        `<pre class="my-8 overflow-x-auto rounded-sm border p-5 text-sm leading-relaxed" style="background:var(--surface)"><code data-lang="${escapeHtml(lang)}" class="font-mono">${escapeHtml(buf.join('\n'))}</code></pre>`,
      )
      continue
    }

    // Separador
    if (/^(---|\*\*\*|___)\s*$/.test(line)) {
      out.push('<div class="gold-rule my-12"></div>')
      i++
      continue
    }

    // Encabezado
    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if (heading) {
      const level = (heading[1] ?? '#').length
      const cls = HEADING_CLASSES[level] ?? HEADING_CLASSES[4] ?? ''
      out.push(
        `<h${level} class="${cls}" style="color:var(--foreground)">${inline(escapeHtml(heading[2] ?? ''))}</h${level}>`,
      )
      i++
      continue
    }

    // Cita
    if (/^>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^>\s?/.test(at(i))) {
        buf.push(at(i).replace(/^>\s?/, ''))
        i++
      }
      out.push(
        `<blockquote class="my-8 border-l-2 pl-6 italic font-display text-xl" style="border-color:var(--accent);color:var(--muted-foreground)">${inline(escapeHtml(buf.join(' ')))}</blockquote>`,
      )
      continue
    }

    // Lista (con viñeta o numerada)
    const isBullet = /^[-*+]\s+/.test(line)
    const isNumber = /^\d+\.\s+/.test(line)
    if (isBullet || isNumber) {
      const items: string[] = []
      const matcher = isBullet ? /^[-*+]\s+/ : /^\d+\.\s+/
      while (i < lines.length && matcher.test(at(i))) {
        items.push(`<li class="pl-1">${inline(escapeHtml(at(i).replace(matcher, '')))}</li>`)
        i++
      }
      const tag = isBullet ? 'ul' : 'ol'
      const listStyle = isBullet ? 'list-disc' : 'list-decimal'
      out.push(
        `<${tag} class="my-6 space-y-2 ${listStyle} pl-5 marker:text-[color:var(--accent)]" style="color:var(--muted-foreground)">${items.join('')}</${tag}>`,
      )
      continue
    }

    // Línea en blanco
    if (!line.trim()) {
      i++
      continue
    }

    // Párrafo: acumula hasta la siguiente línea vacía o bloque especial
    const buf: string[] = []
    while (
      i < lines.length &&
      at(i).trim() &&
      !/^(#{1,4}\s|>|```|[-*+]\s|\d+\.\s|(---|\*\*\*|___)\s*$)/.test(at(i))
    ) {
      buf.push(at(i).trim())
      i++
    }
    out.push(
      `<p class="my-5 leading-[1.85] font-light text-pretty" style="color:var(--muted-foreground)">${inline(escapeHtml(buf.join(' ')))}</p>`,
    )
  }

  return out.join('\n')
}

/** Frontmatter YAML sencillo: `clave: valor` y listas `[a, b]`. */
export function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>
  body: string
} {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(raw)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, string | string[]> = {}

  for (const line of (match[1] ?? '').split('\n')) {
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line.trim())
    if (!kv) continue

    const key = kv[1]
    if (!key) continue

    const value = (kv[2] ?? '').trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
      continue
    }

    data[key] = value.replace(/^["']|["']$/g, '')
  }

  return { data, body: raw.slice(match[0].length) }
}

/** Estimación de lectura a 200 palabras por minuto, mínimo 1. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
