# Portafolio — Karlos Batista

Vue 3 · TypeScript · Tailwind v4 · vue-i18n (ES/EN) · Vite

Tema doble: **bosque nocturno** (verde profundo, madera, letra blanca, dorado) y
**claro del bosque** (crema, letra negra, hojas verdes, detalles dorados).

## Puesta en marcha

```sh
pnpm install
pnpm dev
```

```sh
pnpm build      # type-check + build de producción
pnpm preview    # servir el build
```

## Dónde se edita cada cosa

Todo el contenido está separado de los componentes. Para actualizar el sitio no
hace falta tocar ninguna vista:

| Qué                                        | Archivo                       |
| ------------------------------------------ | ----------------------------- |
| Correo, teléfono, redes, CV, disponibilidad | `src/data/profile.ts`         |
| Proyectos (personales, freelance, laboral)  | `src/data/projects.ts`        |
| Experiencia, educación y valores            | `src/data/experience.ts`      |
| Habilidades e idiomas                       | `src/data/skills.ts`          |
| Textos de interfaz                          | `src/i18n/locales/{es,en}.ts` |
| Entradas del blog                           | `src/content/blog/*.md`       |

Los datos con estructura llevan su propio par `{ es, en }` y se resuelven con
`useLocalized()`. En `src/i18n` solo van cadenas de interfaz: los arreglos
metidos ahí se leen una sola vez y dejan de reaccionar al cambio de idioma.

### Añadir un proyecto

Un objeto más en `src/data/projects.ts` con su `kind` (`work`, `freelance` o
`personal`). La portada se genera sola a partir del `slug`, así que no hay que
subir ninguna imagen. Marca `featured: true` para que salga en el inicio.

### Escribir una entrada del blog

Un `.md` en `src/content/blog/`. El nombre del archivo es la URL:

```markdown
---
title: Título de la entrada
date: 2026-08-20
excerpt: Una o dos frases que se ven en la tarjeta del listado.
tags: [Vue, Testing]
lang: es
---

Contenido en Markdown.
```

Para la versión en inglés del mismo artículo: `mi-articulo.en.md`.
Aparece en `/sobre-mi#blog` y se lee en `/blog/mi-articulo`.

## Formulario de contacto

Envía por [Web3Forms](https://web3forms.com) — sin servidor propio. Pide una
clave gratis con tu correo y ponla en un `.env`:

```sh
cp .env.example .env
# VITE_WEB3FORMS_KEY=tu-clave
```

En Vercel/Netlify hay que declarar la misma variable en el panel del proyecto.

**Sin la clave el formulario no se rompe**: cae a `mailto:` con los campos ya
rellenados. Los botones de contacto directo (correo, WhatsApp, LinkedIn,
GitHub) funcionan siempre.

## Estructura

```
src/
  assets/main.css        Sistema de diseño: tokens de los dos temas, botones,
                         texturas y animaciones
  components/
    layout/              NavBar (con submenú de Proyectos) y FooterBar
    sections/            Bloques de página reutilizables
    ui/                  Piezas sueltas: portadas generadas, fondo de bosque,
                         lluvia en canvas, iconos de marca
    blog/                Tarjeta de entrada
  composables/           useLocalized, useLocale, useContactForm
  data/                  Contenido tipado
  directives/reveal.ts   `v-reveal`: aparición al entrar en el viewport
  lib/markdown.ts        Renderizador Markdown propio, sin dependencias
  pages/                 Una por ruta
```

## Rutas

| Ruta            | Contenido                                                    |
| --------------- | ------------------------------------------------------------ |
| `/`             | Recorrido completo resumido, con contacto incluido           |
| `/sobre-mi`     | Historia larga, experiencia, formación y blog                |
| `/blog/:slug`   | Entrada del blog                                             |
| `/proyectos`    | Todo el trabajo con filtro por tipo (`?tipo=work\|freelance\|personal`) |
| `/contacto`     | Contacto directo y formulario                                |

## Accesibilidad y rendimiento

- El tema se aplica en `index.html` antes del primer pintado: sin destello al cargar.
- Todo respeta `prefers-reduced-motion`; la lluvia ni siquiera arranca.
- La lluvia se detiene cuando la sección sale de pantalla o la pestaña pasa a segundo plano.
- Las imágenes viven en el repositorio: ninguna petición a servicios externos.
