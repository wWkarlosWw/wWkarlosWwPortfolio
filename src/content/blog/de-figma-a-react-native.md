---
title: De Figma a React Native sin traicionar el diseño
date: 2026-07-12
excerpt: Lo que aprendí construyendo una app móvil desde un archivo de Figma que no era mío, y por qué la fidelidad al diseño es un problema técnico, no estético.
tags: [React Native, Figma, UI]
lang: es
---

Cuando me tocó construir la aplicación móvil de la empresa, el punto de partida era un archivo de Figma que yo no había diseñado. La instrucción era simple de decir y difícil de cumplir: que la app se viera como el diseño.

## El error de mirar pantalla por pantalla

Mi primer instinto fue abrir la primera pantalla y empezar a maquetarla. Avancé rápido y me estrellé igual de rápido: para la cuarta pantalla ya tenía tres botones distintos que hacían lo mismo, y dos escalas de espaciado que no coincidían entre sí.

El diseño no era una lista de pantallas. Era un sistema con reglas, y yo lo estaba leyendo como si fuera un catálogo de imágenes.

## Leer el archivo antes de escribir código

Volví atrás y dediqué un día entero a no programar. Solo a recorrer el archivo y anotar:

- Cuántos tamaños de texto existen de verdad
- Cuántos espaciados se repiten
- Qué componentes aparecen en más de una pantalla
- Dónde el diseñador rompió su propia regla a propósito

Ese último punto es el más interesante. Casi siempre hay excepciones intencionales, y distinguirlas de los descuidos es la mitad del trabajo. Cuando no estaba seguro, preguntaba en lugar de adivinar.

## Los tokens primero, las pantallas después

Con esa lista armé los tokens antes que cualquier vista: colores, tipografías, escala de espaciado. Después los componentes compartidos. Recién al final, las pantallas.

La segunda mitad del proyecto fue notablemente más rápida que la primera, y no porque yo hubiera mejorado como programador en tres semanas. Fue porque las pantallas nuevas ya casi no requerían código nuevo.

> Un diseño fiel no se consigue mirando mucho la referencia. Se consigue extrayendo sus reglas y dejando que el código las obedezca.

## Cuándo sí conviene discutir el diseño

Durante el desarrollo aparecieron detalles que en la pantalla real no funcionaban igual que en el lienzo: un área táctil demasiado chica, un texto que se cortaba en teléfonos angostos.

Ahí propuse cambios, y varios fueron aprobados. La diferencia entre proponer y cambiar por cuenta propia es enorme: lo primero suma criterio al equipo, lo segundo rompe la confianza en que la app refleja lo acordado.
