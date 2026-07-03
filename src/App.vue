<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import FooterBar from '@/components/layout/FooterBar.vue'
</script>

<template>
  <div class="min-h-screen" style="background-color: var(--background); color: var(--text-primary);">
    <NavBar />
    <main>
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>
