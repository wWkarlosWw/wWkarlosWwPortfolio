<script setup lang="ts">
import { computed } from 'vue'

/**
 * Texto que entra letra a letra, cada una subiendo desde debajo de su línea.
 *
 * Las letras van con `aria-hidden` y el texto completo en un `sr-only`, así
 * un lector de pantalla lee "Karlos" y no "K, a, r, l, o, s". El índice de
 * cada letra es continuo entre palabras para que el escalonado no se reinicie.
 */
const props = withDefaults(
  defineProps<{
    text: string
    /** Retardo inicial, en milisegundos. Se suma al del telón de entrada. */
    delay?: number
    /** Separación entre letras, en milisegundos. */
    stagger?: number
  }>(),
  { delay: 0, stagger: 38 },
)

const words = computed(() => {
  let index = 0
  return props.text.split(' ').map((word) => ({
    word,
    chars: [...word].map((char) => ({ char, i: index++ })),
  }))
})
</script>

<template>
  <span>
    <span class="sr-only">{{ text }}</span>
    <template v-for="(w, wi) in words" :key="wi">
      <span class="split-word" aria-hidden="true">
        <span
          v-for="c in w.chars"
          :key="c.i"
          class="split-char"
          :style="{ animationDelay: `calc(var(--intro-delay, 0ms) + ${delay + c.i * stagger}ms)` }"
        >{{ c.char }}</span>
      </span>
      <template v-if="wi < words.length - 1">{{ ' ' }}</template>
    </template>
  </span>
</template>
