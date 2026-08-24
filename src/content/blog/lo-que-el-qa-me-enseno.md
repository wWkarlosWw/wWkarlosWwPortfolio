---
title: Lo que aprender QA le hizo a mi forma de programar
date: 2026-05-28
excerpt: Estudiar pruebas de caja blanca, gris y negra no me convirtió en tester. Me cambió el orden en el que pienso cuando escribo una función.
tags: [QA, Testing, Práctica]
lang: es
---

Estudié pruebas de caja blanca, gris y negra esperando aprender a romper software ajeno. Lo que terminó cambiando fue cómo escribo el mío.

## Tres formas de mirar lo mismo

La distinción, resumida sin ceremonia:

1. **Caja negra** — solo veo entradas y salidas. Pruebo el contrato.
2. **Caja gris** — conozco parte de la estructura interna. Pruebo el contrato sabiendo dónde suele doler.
3. **Caja blanca** — veo todo el código. Pruebo los caminos, incluidos los que nadie recorre.

Lo útil no es memorizar las definiciones. Es notar que uno puede cambiar de sombrero a voluntad sobre el mismo código.

## El hábito que se me quedó

Ahora, antes de dar por terminada una función, la miro dos veces:

- Primero como autor: ¿hace lo que quería?
- Después como caja negra: si solo tuviera la firma y el nombre, ¿qué le metería para romperla?

La segunda mirada es la que encuentra el `null` que no contemplé, la lista vacía, el string con espacios al inicio, el número negativo donde asumí que siempre habría uno positivo.

## Los casos límite no son casos raros

Durante mucho tiempo pensé que los casos límite eran situaciones improbables que valía la pena ignorar por velocidad. En producción descubrí lo contrario: los usuarios llegan a los bordes todo el tiempo, sin proponérselo.

El campo vacío que nadie llenaría se llena. El pedido de cero unidades se hace. La conexión se corta justo en la mitad de la petición.

> Escribir la prueba antes de arreglar el error es lo que impide que el mismo error vuelva en tres meses con otra ropa.

## Dónde vale la pena y dónde no

No pruebo todo. En un proyecto personal de fin de semana, escribir suites completas sería una ceremonia sin público.

Donde sí insisto es en la lógica que toca dinero, inventario o datos que no se pueden reconstruir. Ahí una prueba unitaria de diez líneas ha valido, más de una vez, una tarde entera de no tener que investigar qué pasó.
