import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    key: 'languages',
    name: { es: 'Lenguajes', en: 'Languages' },
    items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'C++'],
  },
  {
    key: 'frontend',
    name: { es: 'Frontend', en: 'Frontend' },
    items: ['Vue.js', 'Nuxt', 'React.js', 'React Native', 'Tailwind CSS', 'CSS'],
  },
  {
    key: 'backend',
    name: { es: 'Backend', en: 'Backend' },
    items: ['Node.js', 'Express.js', 'Nest.js', 'REST APIs'],
  },
  {
    key: 'data',
    name: { es: 'Bases de datos', en: 'Databases' },
    items: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    key: 'qa',
    name: { es: 'QA & Testing', en: 'QA & Testing' },
    items: ['White box testing', 'Gray box testing', 'Black box testing', 'Pruebas unitarias'],
  },
  {
    key: 'tools',
    name: { es: 'Herramientas', en: 'Tooling' },
    items: ['Git', 'GitHub', 'CI/CD', 'Jira', 'Figma', 'Claude Code', 'openCode'],
  },
]

/** Se muestran como fichas sueltas bajo la rejilla de habilidades. */
export const toolbelt: string[] = [
  'Git',
  'GitHub Actions',
  'Vite',
  'Postman',
  'Docker',
  'Figma',
  'Jira',
  'Linux',
]

export const softSkills: Array<{ es: string; en: string }> = [
  { es: 'Trabajo en equipo', en: 'Teamwork' },
  { es: 'Pensamiento lógico y analítico', en: 'Logical & analytical thinking' },
  { es: 'Aprendizaje continuo', en: 'Continuous learning' },
  { es: 'Comunicación técnica', en: 'Technical communication' },
]
