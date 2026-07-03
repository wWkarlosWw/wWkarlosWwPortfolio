export default {
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    projects: 'Proyectos',
    contact: 'Contacto',
  },
  hero: {
    label: 'Full Stack Developer',
    firstName: 'Karlos',
    lastName: 'Batista',
    description: 'Creo soluciones digitales con precisión analítica y visión creativa — transformando problemas complejos en experiencias funcionales y elegantes.',
    ctaProjects: 'Ver Proyectos',
    ctaContact: 'Conversemos',
    scroll: 'Descubrir',
    available: 'Disponible 2025',
  },
  about: {
    label: 'Sobre Mí',
    title: 'Donde la lógica',
    titleEm: 'encuentra la creatividad',
    paragraphs: [
      'Soy desarrollador full-stack con sede en Cochabamba, Bolivia. Mi trabajo combina la resolución analítica de problemas con un enfoque creativo que va más allá de lo funcional.',
      'Soy una persona curiosa y motivada que disfruta aprender cosas nuevas y conectar con personas. Me encanta resolver problemas, liderar equipos y compartir lo que aprendo con los demás.',
      'Cuando no estoy programando, me encontrarás en el gimnasio, dando un paseo o jugando videojuegos. Valoro la puntualidad, la responsabilidad y el trabajo en equipo.',
    ],
    stats: [
      { num: '5+', label: 'Proyectos' },
      { num: '3+', label: 'Clientes' },
      { num: '2023', label: 'Inicio Trayectoria' },
    ],
    experience: {
      years: '3+',
      label: 'Años de experiencia',
    },
  },
  projects: {
    label: 'Trabajo Selecto',
    title: 'Proyectos',
    description: 'Soluciones reales construidas con propósito, precisión y pasión.',
    list: [
      {
        title: 'Sistema Ventas e Inventario',
        category: 'Full Stack App',
        description: 'Sistema completo de ventas y gestión de inventario con seguimiento en tiempo real, reportes y soporte multi-usuario.',
        tags: ['React', 'Node.js', 'MySQL', 'TypeScript'],
        img: 'https://images.unsplash.com/photo-1621409581512-c2bea301a88d?w=700&h=420&fit=crop&auto=format',
        link: '#',
      },
      {
        title: 'Control de Inventario',
        category: 'Web App',
        description: 'Sistema de control de inventario diseñado para la gestión eficiente de stock, seguimiento de pedidos y operaciones de cadena de suministro.',
        tags: ['React', 'Node.js', 'MySQL'],
        img: 'https://images.unsplash.com/photo-1628242345770-ec44a4f72017?w=700&h=420&fit=crop&auto=format',
        link: '#',
      },
      {
        title: 'SANITARIO',
        category: 'Sitio Web',
        description: 'Sitio web profesional para SANITARIO con diseño moderno y layout responsivo.',
        tags: ['JavaScript', 'CSS', 'HTML'],
        img: 'https://images.unsplash.com/photo-1612703508477-00e02a9b170c?w=700&h=420&fit=crop&auto=format',
        link: '#',
      },
      {
        title: 'masala',
        category: 'Full Stack App',
        description: 'Aplicación web full-stack para masala con funcionalidades integradas y arquitectura limpia.',
        tags: ['React', 'Node.js', 'TypeScript', 'MySQL'],
        img: 'https://images.unsplash.com/photo-1609088810733-c3b2eb8df983?w=700&h=420&fit=crop&auto=format',
        link: '#',
      },
    ],
  },
  skills: {
    label: 'Expertise',
    title: 'Habilidades',
    groups: [
      {
        name: 'Frontend',
        items: ['JavaScript', 'TypeScript', 'React.js', 'CSS'],
      },
      {
        name: 'Backend',
        items: ['Node.js', 'Python', 'C#', 'MySQL'],
      },
      {
        name: 'Herramientas',
        items: ['Git', 'GitHub', 'VS Code', 'Linux'],
      },
      {
        name: 'Creativo',
        items: ['Fotografía', 'Dirección de Cine', 'Redes Sociales', 'Composición Creativa'],
      },
    ],
    toolsLabel: 'Herramientas frecuentes',
    tools: ['VS Code', 'GitHub', 'Node.js', 'MySQL', 'Figma', 'Postman'],
  },
  contact: {
    label: 'Hablemos',
    title: '¿Tienes un',
    titleEm: 'proyecto?',
    description: 'Me encanta colaborar en proyectos con propósito. Cuéntame tu idea — desde un prototipo hasta un sistema complejo.',
    form: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre completo',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntame sobre tu proyecto...',
      submit: 'Enviar Mensaje',
      sent: '¡Mensaje enviado!',
    },
    info: [
      { icon: 'mail', label: 'Email', value: 'batistaleitecardozokarlos@gmail.com' },
      { icon: 'linkedin', label: 'LinkedIn', value: '/in/karlosbatista' },
      { icon: 'github', label: 'GitHub', value: '@karlosbatista' },
    ],
  },
  footer: {
    copyright: '© 2025 Karlos Batista — Hecho con intención',
  },
}
