<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from '@lucide/vue'
import AmbientGlow from '@/components/ui/AmbientGlow.vue'
import lostImg from '@/assets/img/k10.jpeg'

const { t } = useI18n()
</script>

<template>
  <section class="tone-dark relative flex min-h-[80svh] items-center overflow-hidden">
    <AmbientGlow tone="dark" />

    <div class="shell relative z-10 grid items-center gap-14 pt-28 pb-16 lg:grid-cols-[1fr_auto]">
      <div class="text-center lg:text-left">
        <p class="numeric text-[9rem] leading-none sm:text-[13rem]" style="color: var(--accent); opacity: 0.35">
          404
        </p>

        <h1 class="display-md mt-2" style="color: var(--foreground)">
          {{ t('notFound.title') }}
        </h1>

        <p class="mx-auto mt-5 max-w-sm text-sm leading-relaxed lg:mx-0" style="color: var(--muted-foreground)">
          {{ t('notFound.description') }}
        </p>

        <RouterLink v-magnetic :to="{ name: 'home' }" class="btn btn-primary mt-10">
          <ArrowLeft :size="14" />
          {{ t('notFound.cta') }}
        </RouterLink>
      </div>

      <!-- Polaroid: un guiño, porque perderse también pasa -->
      <figure
        class="lost-polaroid mx-auto w-60 rounded-[var(--radius)] p-3 pb-5 sm:w-64"
        style="background: var(--card); border: 1px solid var(--border); box-shadow: var(--shadow-lg)"
      >
        <div class="aspect-square overflow-hidden rounded-[var(--radius-md)]" style="background: var(--muted)">
          <img :src="lostImg" :alt="t('notFound.photoAlt')" class="h-full w-full object-cover object-[50%_35%]" />
        </div>
        <figcaption class="mt-4 text-center font-display text-lg italic" style="color: var(--muted-foreground)">
          {{ t('notFound.photoCaption') }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.lost-polaroid {
  transform: rotate(4deg);
  animation: polaroid-drop 1.1s var(--ease-out-soft) 0.2s both, leaf-sway 7s ease-in-out 1.3s infinite;
  transform-origin: 50% 0;
}

@keyframes polaroid-drop {
  from { opacity: 0; transform: translateY(-40px) rotate(-8deg); }
  to   { opacity: 1; transform: rotate(4deg); }
}
</style>
