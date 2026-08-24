import type { Project, ProjectKind } from './types'

/**
 * Proyectos verificados. Los `work` y `freelance` provienen del CV; los
 * `personal` corresponden a repositorios públicos de github.com/wWkarlosWw.
 */
export const projects: Project[] = [
  /* ---------------------------------------------------------------
     EXPERIENCIA LABORAL
     --------------------------------------------------------------- */
  {
    slug: 'q-minex-mobile',
    kind: 'work',
    title: 'Q-Minex Mobile',
    client: { es: 'Q-Minex', en: 'Q-Minex' },
    category: { es: 'App móvil', en: 'Mobile app' },
    period: 'Jul 2025 — Jun 2026',
    featured: true,
    summary: {
      es: 'La aplicación móvil de la empresa, construida desde cero con React Native.',
      en: 'The company mobile app, built from scratch with React Native.',
    },
    description: {
      es: 'Me encargué de llevar la aplicación móvil de Q-Minex desde el diseño en Figma hasta la entrega, cuidando que cada pantalla respetara la intención original de UI/UX. Trabajé dentro de un flujo ágil, con tareas gestionadas en Jira y entregas validadas por pipelines de CI/CD.',
      en: 'I carried the Q-Minex mobile app from Figma design through to delivery, making sure every screen honoured the original UI/UX intent. I worked inside an agile flow, with tasks tracked in Jira and releases validated by CI/CD pipelines.',
    },
    highlights: [
      {
        es: 'Traducción fiel de los diseños de Figma a componentes nativos reutilizables.',
        en: 'Faithful translation of the Figma designs into reusable native components.',
      },
      {
        es: 'Consumo de la API interna con manejo de estados de carga, error y sesión.',
        en: 'Consumed the internal API with proper loading, error and session state handling.',
      },
      {
        es: 'Propuestas de mejora de interfaz aceptadas e incorporadas al producto.',
        en: 'Interface improvement proposals accepted and shipped into the product.',
      },
    ],
    tags: ['React Native', 'TypeScript', 'Figma', 'Jira', 'CI/CD'],
  },
  {
    slug: 'q-minex-platform',
    kind: 'work',
    title: 'Q-Minex Web Platform',
    client: { es: 'Q-Minex', en: 'Q-Minex' },
    category: { es: 'Plataforma web', en: 'Web platform' },
    period: 'Jul 2025 — Jun 2026',
    featured: true,
    summary: {
      es: 'Nuevas funcionalidades y arquitectura de la plataforma web, en Vue/Nuxt y Nest.',
      en: 'New features and architecture work on the web platform, in Vue/Nuxt and Nest.',
    },
    description: {
      es: 'Desarrollé y mantuve funcionalidades de la plataforma web participando en las dos puntas: interfaces en Vue y Nuxt, y servicios en Node con Nest.js. Además de escribir código, cuidé la calidad con pruebas unitarias y el seguimiento de los pipelines de integración continua.',
      en: 'I built and maintained web platform features across both ends: interfaces in Vue and Nuxt, and services in Node with Nest.js. Beyond writing code, I looked after quality with unit tests and by monitoring the continuous integration pipelines.',
    },
    highlights: [
      {
        es: 'Aporte a la arquitectura general del sistema junto al equipo senior.',
        en: 'Contributed to the overall system architecture alongside the senior team.',
      },
      {
        es: 'Pruebas unitarias sobre la lógica crítica antes de cada entrega.',
        en: 'Unit tests over critical logic ahead of every release.',
      },
      {
        es: 'Monitoreo y corrección de fallos en los pipelines de CI/CD.',
        en: 'Monitoring and fixing failures in the CI/CD pipelines.',
      },
    ],
    tags: ['Vue.js', 'Nuxt', 'Nest.js', 'Node.js', 'CI/CD', 'Testing'],
  },

  /* ---------------------------------------------------------------
     FREELANCE
     --------------------------------------------------------------- */
  {
    slug: 'masala',
    kind: 'freelance',
    title: 'Masala',
    client: { es: 'Masala', en: 'Masala' },
    category: { es: 'Ventas e inventario', en: 'Sales & inventory' },
    featured: true,
    summary: {
      es: 'Sistema completo de gestión de ventas e inventario, diseñado y construido desde cero.',
      en: 'A complete sales and inventory management system, designed and built from scratch.',
    },
    description: {
      es: 'Levanté los requisitos directamente con el negocio, estructuré la base de datos y escribí la lógica full-stack hasta dejar una solución operativa. El objetivo era que el equipo de Masala pudiera registrar ventas y controlar existencias sin depender de hojas de cálculo.',
      en: 'I gathered the requirements directly with the business, structured the database and wrote the full-stack logic through to a working solution. The goal was for the Masala team to record sales and track stock without relying on spreadsheets.',
    },
    highlights: [
      {
        es: 'Recopilación de requisitos y modelado de la base de datos desde cero.',
        en: 'Requirements gathering and database modelling from scratch.',
      },
      {
        es: 'Registro de ventas, control de existencias y reportes para el día a día.',
        en: 'Sales recording, stock control and day-to-day reporting.',
      },
      {
        es: 'Entrega de una solución operativa y acompañamiento en la puesta en marcha.',
        en: 'Delivery of an operational solution plus onboarding support.',
      },
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL'],
  },
  {
    slug: 'data-consult',
    kind: 'freelance',
    title: 'Data Consult',
    client: { es: 'Data Consult', en: 'Data Consult' },
    category: { es: 'E-commerce', en: 'E-commerce' },
    featured: true,
    summary: {
      es: 'Plataforma de comercio electrónico con catálogos de producto dinámicos.',
      en: 'An e-commerce platform driven by dynamic product catalogues.',
    },
    description: {
      es: 'Me hice cargo por completo de la arquitectura e implementación del frontend. La plataforma debía manejar catálogos que cambian con frecuencia, así que trabajé sobre componentes escalables y una navegación pensada para que el cliente encuentre rápido lo que busca.',
      en: 'I fully owned the frontend architecture and implementation. The platform had to handle frequently changing catalogues, so I built on scalable components and navigation designed to get customers to what they want quickly.',
    },
    highlights: [
      {
        es: 'Arquitectura de componentes preparada para catálogos que crecen.',
        en: 'Component architecture ready for catalogues that keep growing.',
      },
      {
        es: 'Interfaz altamente interactiva, con filtrado y búsqueda de producto.',
        en: 'Highly interactive interface, with product filtering and search.',
      },
    ],
    tags: ['React', 'JavaScript', 'CSS'],
  },
  {
    slug: 'sagitario',
    kind: 'freelance',
    title: 'Sagitario',
    client: { es: 'Sagitario', en: 'Sagitario' },
    category: { es: 'Software de escritorio', en: 'Desktop software' },
    summary: {
      es: 'Sistema de inventario local de escritorio, ajustado a la operación diaria del cliente.',
      en: 'A local desktop inventory system, tailored to the client daily operation.',
    },
    description: {
      es: 'El cliente necesitaba trabajar sin depender de internet, así que la solución fue una aplicación de escritorio en C# con MySQL. Fui responsable del desarrollo completo del software y de dejar la integración con la base de datos funcionando de forma estable.',
      en: 'The client needed to work without depending on the internet, so the answer was a C# desktop application backed by MySQL. I was responsible for the entire software build and for leaving the database integration running reliably.',
    },
    highlights: [
      {
        es: 'Aplicación de escritorio pensada para operar sin conexión.',
        en: 'Desktop application designed to run offline.',
      },
      {
        es: 'Integración estable con MySQL y respaldo de los datos del negocio.',
        en: 'Stable MySQL integration with backup of the business data.',
      },
    ],
    tags: ['C#', '.NET', 'MySQL'],
  },
  {
    slug: 'shopping-pc',
    kind: 'freelance',
    title: 'Shopping PC',
    client: { es: 'Shopping PC', en: 'Shopping PC' },
    category: { es: 'Tienda online', en: 'Online store' },
    summary: {
      es: 'Tienda en línea para un negocio que daba su primer paso al comercio digital.',
      en: 'An online store for a business taking its first step into digital commerce.',
    },
    description: {
      es: 'Construí la experiencia de compra del frontend con foco en que fuera fácil de usar y se adaptara bien a móvil, que era donde estaban la mayoría de sus clientes. Implementé los componentes principales de la interfaz con React.',
      en: 'I built the frontend shopping experience with a focus on being easy to use and adapting well to mobile, where most of their customers were. I implemented the core interface components with React.',
    },
    highlights: [
      {
        es: 'Diseño responsivo priorizando el uso desde el teléfono.',
        en: 'Responsive design prioritising phone usage.',
      },
      {
        es: 'Componentes de catálogo, carrito y checkout básico.',
        en: 'Catalogue, cart and basic checkout components.',
      },
    ],
    tags: ['React', 'JavaScript', 'CSS'],
  },

  /* ---------------------------------------------------------------
     PROYECTOS PERSONALES
     --------------------------------------------------------------- */
  {
    slug: 'hadassa',
    kind: 'personal',
    title: 'Hadassa',
    category: { es: 'Sistema de donaciones', en: 'Donations system' },
    featured: true,
    summary: {
      es: 'Plataforma de donaciones con frontend y API propios, desplegada en Vercel.',
      en: 'A donations platform with its own frontend and API, deployed on Vercel.',
    },
    description: {
      es: 'Proyecto de dos repositorios: una interfaz en TypeScript para que las personas donen y sigan las campañas, y un backend que administra donantes, campañas y montos. Es el proyecto personal donde más cuidé la separación entre capas.',
      en: 'A two-repository project: a TypeScript interface for people to donate and follow campaigns, and a backend managing donors, campaigns and amounts. It is the personal project where I took most care over layer separation.',
    },
    highlights: [
      {
        es: 'Frontend y backend en repositorios separados, con contrato de API definido.',
        en: 'Frontend and backend in separate repos, with a defined API contract.',
      },
      {
        es: 'Desplegado y accesible públicamente en Vercel.',
        en: 'Deployed and publicly reachable on Vercel.',
      },
    ],
    tags: ['TypeScript', 'Node.js', 'Vercel'],
    repo: 'https://github.com/wWkarlosWw/hadassa-web',
    demo: 'https://hadassa-web.vercel.app',
  },
  {
    slug: 'pokedex',
    kind: 'personal',
    title: 'PokéDex',
    category: { es: 'Web + móvil', en: 'Web + mobile' },
    summary: {
      es: 'La misma PokéDex resuelta dos veces: una en Vue y otra en React Native.',
      en: 'The same PokéDex solved twice: once in Vue and once in React Native.',
    },
    description: {
      es: 'Un ejercicio deliberado de comparación: construir la misma aplicación —listado, búsqueda, detalle y estadísticas— en dos stacks distintos para entender qué cambia realmente entre una web y una app nativa cuando el problema es idéntico.',
      en: 'A deliberate comparison exercise: building the same application — list, search, detail and stats — on two different stacks, to understand what really changes between a web app and a native app when the problem is identical.',
    },
    highlights: [
      {
        es: 'Consumo de la PokéAPI con paginación y caché en memoria.',
        en: 'PokéAPI consumption with pagination and in-memory caching.',
      },
      {
        es: 'Misma lógica de dominio reescrita para web y para móvil.',
        en: 'The same domain logic rewritten for web and for mobile.',
      },
    ],
    tags: ['Vue.js', 'React Native', 'TypeScript', 'REST API'],
    repo: 'https://github.com/wWkarlosWw/pokeDexVue-q-minex',
  },
  {
    slug: 'vision-ml',
    kind: 'personal',
    title: 'Reconocimiento de imágenes',
    category: { es: 'Machine learning', en: 'Machine learning' },
    summary: {
      es: 'Dos clasificadores de imágenes entrenados en Jupyter: animales y prendas de ropa.',
      en: 'Two image classifiers trained in Jupyter: animals and clothing items.',
    },
    description: {
      es: 'Salida deliberada de mi zona de confort. Entrené redes convolucionales para clasificar imágenes de animales y de prendas de ropa, trabajando el preprocesado del dataset, el entrenamiento y la lectura de las métricas de acierto.',
      en: 'A deliberate step outside my comfort zone. I trained convolutional networks to classify images of animals and clothing, working through dataset preprocessing, training and reading the accuracy metrics.',
    },
    highlights: [
      {
        es: 'Preprocesado y aumento del dataset antes del entrenamiento.',
        en: 'Dataset preprocessing and augmentation ahead of training.',
      },
      {
        es: 'Evaluación con matriz de confusión para entender los fallos, no solo el acierto.',
        en: 'Evaluation with a confusion matrix to understand failures, not just accuracy.',
      },
    ],
    tags: ['Python', 'Jupyter', 'TensorFlow', 'Computer Vision'],
    repo: 'https://github.com/wWkarlosWw/reconocimiento-de-animales-',
  },
  {
    slug: 'phaser-games',
    kind: 'personal',
    title: 'Juegos en Phaser',
    category: { es: 'Game dev', en: 'Game dev' },
    summary: {
      es: 'Un sudoku jugable y un juego multimedia, ambos con Phaser sobre canvas.',
      en: 'A playable sudoku and a multimedia game, both with Phaser on canvas.',
    },
    description: {
      es: 'Proyectos de la materia de multimedia que aproveché para entender el bucle de juego: escenas, estados, entrada del usuario y render por frame. El sudoku incluye validación de tablero y generación de partidas.',
      en: 'Multimedia coursework I used to get a grip on the game loop: scenes, states, user input and per-frame rendering. The sudoku includes board validation and puzzle generation.',
    },
    highlights: [
      {
        es: 'Generación y validación de tableros de sudoku en el cliente.',
        en: 'Client-side sudoku board generation and validation.',
      },
      {
        es: 'Manejo de escenas, sprites y audio con Phaser.',
        en: 'Scene, sprite and audio handling with Phaser.',
      },
    ],
    tags: ['Phaser', 'JavaScript', 'HTML5 Canvas'],
    repo: 'https://github.com/wWkarlosWw/phaserSudokuh3Examen',
  },
  {
    slug: 'finanzas-dashboard',
    kind: 'personal',
    title: 'Dashboard de Finanzas',
    category: { es: 'Herramienta', en: 'Tool' },
    summary: {
      es: 'Panel de finanzas personales con categorías, balances y persistencia local.',
      en: 'A personal finance dashboard with categories, balances and local persistence.',
    },
    description: {
      es: 'Uno de los proyectos con los que afiancé JavaScript puro: registrar ingresos y gastos, agruparlos por categoría y mostrar el balance sin recargar la página, guardando todo en localStorage.',
      en: 'One of the projects where I consolidated plain JavaScript: recording income and expenses, grouping them by category and showing the balance without reloading, storing everything in localStorage.',
    },
    tags: ['JavaScript', 'CSS', 'localStorage'],
    repo: 'https://github.com/wWkarlosWw/Dashboard-de-Finanzas-Personales',
  },
  {
    slug: 'clima-api',
    kind: 'personal',
    title: 'App del Clima',
    category: { es: 'Consumo de API', en: 'API client' },
    summary: {
      es: 'Consulta del tiempo por ciudad usando la API de OpenWeatherMap.',
      en: 'City weather lookup powered by the OpenWeatherMap API.',
    },
    description: {
      es: 'Pequeña aplicación para practicar peticiones asíncronas, manejo de errores de red y estados vacíos: qué mostrar mientras carga, y qué mostrar cuando la ciudad no existe.',
      en: 'A small app to practise async requests, network error handling and empty states: what to show while loading, and what to show when the city does not exist.',
    },
    tags: ['JavaScript', 'REST API', 'CSS'],
    repo: 'https://github.com/wWkarlosWw/App-del-clima-con-Api-de-OpenWeathermap',
  },
  {
    slug: 'agente-ts',
    kind: 'personal',
    title: 'Agente en TypeScript',
    category: { es: 'IA / Agentes', en: 'AI / Agents' },
    summary: {
      es: 'Experimento de agente con herramientas, escrito en TypeScript.',
      en: 'A tool-using agent experiment, written in TypeScript.',
    },
    description: {
      es: 'Exploración del bucle de agente: definir herramientas, dejar que el modelo decida cuál invocar, ejecutar y devolver el resultado. Nació de usar Claude Code y openCode a diario y querer entender qué ocurre por debajo.',
      en: 'An exploration of the agent loop: defining tools, letting the model decide which to call, running it and returning the result. It came out of using Claude Code and openCode daily and wanting to understand what happens underneath.',
    },
    tags: ['TypeScript', 'Node.js', 'LLM'],
    repo: 'https://github.com/wWkarlosWw/agent_example_boring',
  },
  {
    slug: 'portfolio',
    kind: 'personal',
    title: 'Este portafolio',
    category: { es: 'Diseño + código', en: 'Design + code' },
    summary: {
      es: 'El sitio que estás viendo: Vue 3, Tailwind v4 y un sistema de diseño propio.',
      en: 'The site you are looking at: Vue 3, Tailwind v4 and a design system of my own.',
    },
    description: {
      es: 'Construido con Vue 3, TypeScript, Tailwind v4 e i18n en dos idiomas. El tema claro y el oscuro no son el mismo diseño con los colores invertidos: cada uno tiene sus propias texturas —madera en el bosque nocturno, hojas en el claro del día— y su propia jerarquía.',
      en: 'Built with Vue 3, TypeScript, Tailwind v4 and two-language i18n. The light and dark themes are not the same design with inverted colours: each has its own textures — wood in the night forest, leaves in the daytime clearing — and its own hierarchy.',
    },
    tags: ['Vue 3', 'TypeScript', 'Tailwind v4', 'Vite'],
    repo: 'https://github.com/wWkarlosWw/wWkarlosWwPortfolio',
  },
]

export const projectKinds: ProjectKind[] = ['work', 'freelance', 'personal']

export const kindLabels: Record<ProjectKind, { es: string; en: string }> = {
  work: { es: 'Experiencia laboral', en: 'Work experience' },
  freelance: { es: 'Trabajos freelance', en: 'Freelance work' },
  personal: { es: 'Proyectos personales', en: 'Personal projects' },
}

export const kindBlurbs: Record<ProjectKind, { es: string; en: string }> = {
  work: {
    es: 'Producto en producción, con equipo, plazos y usuarios reales detrás.',
    en: 'Shipped product, with a team, deadlines and real users behind it.',
  },
  freelance: {
    es: 'Encargos de clientes: del levantamiento de requisitos a la entrega.',
    en: 'Client engagements: from requirements gathering through to delivery.',
  },
  personal: {
    es: 'Lo que construyo por curiosidad, para aprender algo que aún no sé hacer.',
    en: 'What I build out of curiosity, to learn something I cannot do yet.',
  },
}

export const featuredProjects = projects.filter((p) => p.featured)

export function projectsByKind(kind: ProjectKind): Project[] {
  return projects.filter((p) => p.kind === kind)
}
