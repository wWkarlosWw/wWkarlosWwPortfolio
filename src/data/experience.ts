import type { EducationEntry, ExperienceEntry } from './types'

/** Trayectoria profesional, tal como figura en el CV. */
export const experience: ExperienceEntry[] = [
  {
    slug: 'q-minex',
    role: {
      es: 'Junior Full Stack Developer',
      en: 'Junior Full Stack Developer',
    },
    org: 'Q-Minex',
    location: 'Cochabamba, Bolivia',
    period: { es: 'Jul 2025 — Jun 2026', en: 'Jul 2025 — Jun 2026' },
    description: {
      es: 'Estuve en todo el proceso: hice y mantuve funcionalidades nuevas de la web y ayudé a decidir cómo se armaba el sistema. Trabajábamos con metodologías ágiles.',
      en: 'I was there for the whole process: I built and maintained new web features and helped decide how the system was put together. We worked with agile methods.',
    },
    achievements: [
      {
        es: 'Hice la app móvil de la empresa con React Native, respetando los diseños de UI/UX al detalle.',
        en: 'I built the company mobile app in React Native, sticking closely to the UI/UX designs.',
      },
      {
        es: 'Propuse cambios de interfaz por mi cuenta; el equipo de producto los revisó y los aprobó.',
        en: 'I suggested interface changes on my own; the product team reviewed and approved them.',
      },
      {
        es: 'Cuidé la calidad del código con pruebas unitarias y revisando los pipelines de CI/CD.',
        en: 'I looked after code quality with unit tests and by keeping an eye on the CI/CD pipelines.',
      },
      {
        es: 'Organicé mis tareas en Jira y mantuve al tanto a mis supervisores.',
        en: 'I organised my tasks in Jira and kept my supervisors in the loop.',
      },
    ],
    tags: ['Vue.js', 'Nuxt', 'Node.js', 'Nest.js', 'React Native', 'Figma', 'Jira', 'CI/CD'],
  },
  {
    slug: 'unifranz-competencias',
    role: {
      es: 'Competencias de programación',
      en: 'Programming competitions',
    },
    org: 'Universidad Privada Franz Tamayo — Unifranz',
    location: 'Cochabamba, Bolivia',
    period: { es: '2023 — Presente', en: '2023 — Present' },
    current: true,
    description: {
      es: 'Compito en los concursos de programación de mi universidad. Ahí se pone a prueba la lógica, resolver bajo presión y trabajar en equipo.',
      en: "I compete in my university's programming contests. They test your logic, solving under pressure and working as a team.",
    },
    achievements: [
      {
        es: 'Resolvemos retos de algoritmos contra reloj, en equipos de dos o tres.',
        en: 'We solve algorithm challenges against the clock, in teams of two or three.',
      },
      {
        es: 'Casi siempre me toca coordinar: repartir el problema, juntar las partes y revisar antes de enviar.',
        en: 'I usually end up coordinating: splitting the problem, putting the parts together and reviewing before we submit.',
      },
    ],
    tags: ['Algoritmos', 'C++', 'Python', 'Trabajo en equipo'],
  },
]

export const education: EducationEntry[] = [
  {
    slug: 'unifranz',
    title: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
    org: 'Universidad Privada Franz Tamayo (Unifranz)',
    period: '2023 — 2027',
    detail: {
      es: 'En curso. Enfoque en desarrollo de software, redes y aseguramiento de calidad.',
      en: 'In progress. Focused on software development, networking and quality assurance.',
    },
  },
  {
    slug: 'angloamericano',
    title: { es: 'Bachillerato', en: 'High school diploma' },
    org: 'Centro Cultural Angloamericano',
    period: '2012 — 2022',
  },
]

/** Valores que el CV enumera como transversales. */
export const values: Array<{ es: string; en: string }> = [
  { es: 'Puntualidad', en: 'Punctuality' },
  { es: 'Responsabilidad', en: 'Responsibility' },
  { es: 'Trabajo en equipo', en: 'Teamwork' },
  { es: 'Aprendizaje continuo', en: 'Continuous learning' },
]
