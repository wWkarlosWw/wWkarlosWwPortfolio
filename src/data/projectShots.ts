/**
 * Capturas de proyectos.
 *
 * Basta con soltar un archivo en `src/assets/projects/` con el `slug` del
 * proyecto como nombre (`masala.jpg`, `q-minex-mobile.png`...) para que
 * aparezca en su tarjeta y en su página. No hay que tocar código.
 */
const files = import.meta.glob<string>('@/assets/projects/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const bySlug: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), url]),
)

export function projectShot(slug: string): string | undefined {
  return bySlug[slug]
}
