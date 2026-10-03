<script setup lang="ts">
/**
 * Inicio: el recorrido completo en una sola página. Quién soy, dónde estoy,
 * qué he construido, con qué trabajo, qué escribo y cómo contactarme — cada
 * bloque enlaza a su versión extendida.
 *
 * La nota va aquí y no sobre el `<div>` del template a propósito: en desarrollo
 * Vue conserva los comentarios como nodos, así que un comentario junto a la raíz
 * convierte la vista en multi-raíz. El `<Transition mode="out-in">` de App.vue
 * no puede animar eso y se quedaba sin renderizar la vista siguiente al salir
 * del inicio: la navegación cambiaba la URL y el `<main>` quedaba vacío.
 */
import HeroSection from '@/components/home/HeroSection.vue'
import SnapshotSection from '@/components/home/SnapshotSection.vue'
import FeaturedWork from '@/components/home/FeaturedWork.vue'
import JourneySection from '@/components/home/JourneySection.vue'
import StackSection from '@/components/home/StackSection.vue'
import NotesSection from '@/components/home/NotesSection.vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import GallerySection from '@/components/home/GallerySection.vue'
import MarqueeBand from '@/components/ui/MarqueeBand.vue'

/** Lo que corre en la banda entre el resumen y los proyectos. */
const craft = ['Vue', 'Nuxt', 'TypeScript', 'Node', 'Nest', 'PostgreSQL', 'QA', 'Full Stack']
</script>

<template>
  <div>
    <HeroSection />
    <SnapshotSection />
    <MarqueeBand :items="craft" />
    <FeaturedWork />
    <GallerySection />
    <JourneySection />
    <StackSection />
    <NotesSection />
    <ContactSection />
  </div>
</template>
