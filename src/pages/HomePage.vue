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
import HeroSection from '@/components/sections/HeroSection.vue'
import SnapshotSection from '@/components/sections/SnapshotSection.vue'
import FeaturedWork from '@/components/sections/FeaturedWork.vue'
import JourneySection from '@/components/sections/JourneySection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import NotesSection from '@/components/sections/NotesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <div>
    <HeroSection />
    <SnapshotSection />
    <FeaturedWork />
    <JourneySection />
    <StackSection />
    <NotesSection />
    <ContactSection />
  </div>
</template>
