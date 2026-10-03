/// <reference types="vite/client" />

import type { vMagnetic } from './src/directives/magnetic'
import type { vReveal } from './src/directives/reveal'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
    vMagnetic: typeof vMagnetic
  }
}
