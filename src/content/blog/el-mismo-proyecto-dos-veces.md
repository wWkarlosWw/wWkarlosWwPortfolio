---
title: Construir el mismo proyecto dos veces, a propósito
date: 2026-03-09
excerpt: Hice la misma PokéDex en Vue y en React Native. No fue pérdida de tiempo: fue la manera más barata que encontré de ver qué es del framework y qué es mío.
tags: [Vue, React Native, Aprendizaje]
lang: es
---

Tenía una PokéDex terminada en Vue y decidí volver a hacerla, esta vez en React Native. Visto de afuera parece trabajo repetido. Fue lo contrario.

## El problema de aprender un framework a la vez

Cuando aprendés una sola herramienta, es imposible distinguir qué parte de lo que sabés es conocimiento real y qué parte es costumbre de esa herramienta.

Yo creía entender el manejo de estado. Lo que entendía era el manejo de estado *en Vue*. No es lo mismo, y solo me di cuenta cuando tuve que resolver el mismo problema sin las mismas piezas.

## Lo que cambió y lo que no

Reescribiendo la app, la separación quedó nítida.

**Cambió** la sintaxis, la forma de declarar reactividad, el sistema de navegación, cómo se aplican los estilos y qué se puede asumir sobre la pantalla.

**No cambió** nada de lo importante:

- Qué pide la aplicación a la API y cuándo
- Cómo se guarda en caché lo que ya se descargó
- Qué se muestra mientras carga
- Qué se muestra cuando la búsqueda no encuentra nada
- Cómo se organiza el modelo de datos

Esa segunda lista es lo que se transporta a cualquier stack. La primera es lo que se vuelve a aprender en una semana.

> Si te cuesta empezar la segunda versión, no es que no sepas el framework nuevo. Es que la primera versión tenía la lógica mezclada con la vista.

## El síntoma más honesto

La parte más incómoda del ejercicio fue descubrir que la lógica que yo creía limpia estaba pegada a los componentes de Vue. Cada vez que tuve que copiar y adaptar en lugar de simplemente mover, encontré un lugar donde había mezclado dominio con presentación.

Nadie me lo señaló en una revisión de código. Lo señaló el propio proceso de mudanza.

## Lo recomendaría, con una condición

Vale la pena si el proyecto es chico y ya lo terminaste una vez. La gracia está en que el problema esté completamente resuelto en tu cabeza, para que toda la atención vaya a la herramienta.

Con un proyecto grande, o con uno que todavía no entendés del todo, se convierte en dos aprendizajes al mismo tiempo y no se aprende bien ninguno.
