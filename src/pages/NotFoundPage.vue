<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from '@lucide/vue'
import ForestBackdrop from '@/components/ui/ForestBackdrop.vue'

const { t } = useI18n()
</script>

<template>
  <section class="relative flex min-h-[80svh] items-center overflow-hidden" style="background: var(--background)">
    <ForestBackdrop variant="full" :intensity="0.7" />

    <div class="shell relative z-10 text-center">
      <p class="numeric text-[9rem] leading-none sm:text-[13rem]" style="color: var(--accent); opacity: 0.35">
        404
      </p>

      <h1 class="display-md mt-2" style="color: var(--foreground)">
        {{ t('notFound.title') }}
      </h1>

      <p class="mx-auto mt-5 max-w-sm text-sm font-light leading-relaxed" style="color: var(--muted-foreground)">
        {{ t('notFound.description') }}
      </p>

      <RouterLink :to="{ name: 'home' }" class="btn btn-gold mt-10">
        <ArrowLeft :size="14" />
        {{ t('notFound.cta') }}
      </RouterLink>
    </div>
  </section>
</template>
