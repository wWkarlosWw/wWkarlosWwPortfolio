<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { experience } from '@/data/experience'
import { useLocalized } from '@/composables/useT'

/**
 * Línea de tiempo vertical con un nodo por etapa.
 *
 * En el inicio se usa en modo `compact`: mismas etapas, pero sin los logros ni
 * las etiquetas, para que el resumen no compita con la página de Sobre Mí.
 */
const props = withDefaults(
  defineProps<{ limit?: number; compact?: boolean }>(),
  { limit: 0, compact: false },
)

const { t } = useI18n()
const { L } = useLocalized()

const entries = computed(() =>
  props.limit > 0 ? experience.slice(0, props.limit) : experience,
)
</script>

<template>
  <ol class="relative">
    <!-- Eje: se desvanece en los extremos para que no corte en seco -->
    <span
      class="absolute left-[7px] top-2 bottom-2 w-px"
      style="background: linear-gradient(180deg, transparent, var(--border-strong) 12%, var(--border-strong) 88%, transparent)"
      aria-hidden="true"
    />

    <li
      v-for="(item, i) in entries"
      :key="item.slug"
      v-reveal="{ delay: i * 110 }"
      :class="compact ? 'relative pb-10 pl-10 last:pb-0' : 'relative pb-14 pl-10 last:pb-0'"
    >
      <!-- Nodo -->
      <span
        class="absolute left-0 top-1.5 flex size-[15px] items-center justify-center rounded-full"
        style="background: var(--background); border: 1px solid var(--accent)"
      >
        <span
          class="size-1.5 rounded-full"
          :style="{ background: item.current ? 'var(--accent)' : 'var(--border-strong)' }"
        />
        <span
          v-if="item.current"
          class="absolute inline-flex size-[15px] animate-ping rounded-full opacity-40"
          style="background: var(--accent)"
        />
      </span>

      <p class="text-[0.68rem] tracking-[0.22em] uppercase" style="color: var(--accent)">
        {{ item.current ? L(item.period).replace(/Presente|Present/, t('common.present')) : L(item.period) }}
      </p>

      <h3 class="mt-2 font-display text-2xl" style="color: var(--foreground)">
        {{ L(item.role) }}
      </h3>

      <p class="mt-1 text-sm font-medium" style="color: var(--muted-foreground)">
        {{ item.org }} · {{ item.location }}
      </p>

      <p class="mt-4 max-w-2xl text-sm leading-relaxed text-pretty" style="color: var(--muted-foreground)">
        {{ L(item.description) }}
      </p>

      <ul v-if="!compact" class="mt-5 space-y-2.5">
        <li
          v-for="(achievement, j) in item.achievements"
          :key="j"
          class="flex gap-3 text-sm leading-relaxed"
          style="color: var(--muted-foreground)"
        >
          <span class="mt-2 size-1.5 shrink-0 rotate-45" style="background: var(--accent)" />
          {{ L(achievement) }}
        </li>
      </ul>

      <div v-if="!compact" class="mt-6 flex flex-wrap gap-1.5">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="rounded-full border px-2.5 py-1 text-[0.62rem] tracking-wide"
          style="border-color: var(--border); color: var(--muted-foreground)"
        >
          {{ tag }}
        </span>
      </div>
    </li>
  </ol>
</template>
