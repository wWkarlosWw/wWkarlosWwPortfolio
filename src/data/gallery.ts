import type { Localized } from './types'
import walk from '@/assets/img/k2.jpeg'
import laugh from '@/assets/img/k3.jpeg'
import stairs from '@/assets/img/hero-photo.jpg'
import pause from '@/assets/img/k7.jpeg'

export interface GalleryPhoto {
  src: string
  alt: Localized
  caption: Localized
  /** Lugar o momento, en una línea corta sobre la foto. */
  place: Localized
}

/** Fotos de la sección "Fuera del código", en el orden en que se recorren. */
export const gallery: GalleryPhoto[] = [
  {
    src: walk,
    alt: { es: 'Karlos caminando de espaldas junto a un muro de piedra', en: 'Karlos walking away beside a stone wall' },
    caption: {
      es: 'Las mejores ideas me salen caminando, no frente a la pantalla.',
      en: 'My best ideas show up while walking, not in front of the screen.',
    },
    place: { es: 'Caminar para pensar', en: 'Walking to think' },
  },
  {
    src: laugh,
    alt: { es: 'Karlos riendo apoyado en una reja', en: 'Karlos laughing, leaning on a fence' },
    caption: {
      es: 'Si no te ríes de tus propios bugs, esto se vuelve muy largo.',
      en: "If you can't laugh at your own bugs, this gets very long.",
    },
    place: { es: 'Buen humor', en: 'Good humour' },
  },
  {
    src: stairs,
    alt: { es: 'Karlos sentado en una escalera', en: 'Karlos sitting on a staircase' },
    caption: {
      es: 'Un escalón por día. Así aprendí todo lo que sé.',
      en: 'One step a day. That is how I learned everything I know.',
    },
    place: { es: 'Peldaño a peldaño', en: 'Step by step' },
  },
  {
    src: pause,
    alt: { es: 'Karlos en una escalera junto a plantas', en: 'Karlos on a staircase next to plants' },
    caption: {
      es: 'A veces hay que soltar el teclado para ver qué estaba mal.',
      en: 'Sometimes you have to let go of the keyboard to see what was wrong.',
    },
    place: { es: 'Entre commits', en: 'Between commits' },
  },
]
