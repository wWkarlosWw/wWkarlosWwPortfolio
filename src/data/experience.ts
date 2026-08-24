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
      es: 'Participé en todo el ciclo de vida del desarrollo bajo metodologías ágiles: creé y mantuve nuevas funcionalidades web y colaboré en la arquitectura general del sistema.',
      en: 'I took part in the full software development lifecycle under agile methodologies: building and maintaining new web features and contributing to the overall system architecture.',
    },
    achievements: [
      {
        es: 'Construí la aplicación móvil de la empresa con React Native, manteniendo alta fidelidad respecto a los diseños de UI/UX.',
        en: 'Built the company mobile app in React Native, keeping high fidelity to the UI/UX designs.',
      },
      {
        es: 'Propuse ajustes de interfaz por iniciativa propia que fueron revisados y aprobados por el equipo de producto.',
        en: 'Proactively proposed interface adjustments that were reviewed and approved by the product team.',
      },
      {
        es: 'Aseguré la calidad del código mediante pruebas unitarias y el monitoreo continuo de los pipelines de CI/CD.',
        en: 'Safeguarded code quality through unit testing and continuous monitoring of the CI/CD pipelines.',
      },
      {
        es: 'Gestioné mi carga de trabajo en Jira y mantuve comunicación técnica constante con los supervisores.',
        en: 'Managed my workload in Jira and kept steady technical communication with supervisors.',
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
      es: 'Participé en varias competencias de programación organizadas por mi universidad, poniendo a prueba lógica, resolución de problemas bajo presión y trabajo en equipo.',
      en: 'I competed in several programming contests hosted by my university, testing logic, problem-solving under pressure and teamwork.',
    },
    achievements: [
      {
        es: 'Resolución de retos algorítmicos con tiempo limitado, en equipos de dos a tres personas.',
        en: 'Solved time-boxed algorithmic challenges in teams of two to three people.',
      },
      {
        es: 'Rol frecuente de coordinación: repartir el problema, integrar las partes y revisar antes de enviar.',
        en: 'Frequent coordination role: splitting the problem, integrating the parts and reviewing before submitting.',
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
