<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="min-h-screen bg-bg-primary text-text-primary">
    <NavBar />

    <main class="mx-auto max-w-5xl px-6 pt-24">
      <section class="flex min-h-[70vh] flex-col justify-center">
        <p class="text-lg text-text-secondary">Hola, soy</p>
        <h2 class="mt-2 text-5xl font-bold text-brand-main">Karlos</h2>
        <p class="mt-2 text-2xl text-brand-accent">Desarrollador Full Stack</p>
        <p class="mt-4 max-w-lg text-text-secondary">
          Construyo aplicaciones web modernas con Vue, TypeScript y más.
        </p>
      </section>
      <div class="h-300 bg-red-500">hasd</div>
    </main>
  </div>
</template>
