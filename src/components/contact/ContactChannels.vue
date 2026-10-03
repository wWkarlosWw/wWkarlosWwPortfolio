<script setup lang="ts">
import { ArrowUpRight, Mail } from '@lucide/vue'
import { contactChannels } from '@/data/profile'
import { useLocalized } from '@/composables/useT'
import BrandIcon from '@/components/ui/BrandIcon.vue'

/** Tarjetas de contacto directo: un clic y estás escribiéndole. */
withDefaults(defineProps<{ columns?: 1 | 2 }>(), { columns: 2 })

const { L } = useLocalized()
</script>

<template>
  <div class="tile-grid grid gap-3" :class="columns === 2 ? 'sm:grid-cols-2' : ''">
    <a
      v-for="(channel, i) in contactChannels"
      :key="channel.key"
      :href="channel.href"
      :target="channel.external ? '_blank' : undefined"
      :rel="channel.external ? 'noopener noreferrer' : undefined"
      v-reveal="{ delay: i * 70 }"
      class="group relative flex items-center gap-4 p-6 transition-colors duration-400"
      style="background: var(--card)"
      @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--muted)')"
      @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--card)')"
    >
      <span
        class="flex size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-400 group-hover:scale-105"
        style="border-color: var(--border-strong); color: var(--accent)"
      >
        <Mail v-if="channel.icon === 'mail'" :size="16" />
        <BrandIcon
          v-else
          :name="channel.icon === 'whatsapp' ? 'whatsapp' : channel.icon === 'linkedin' ? 'linkedin' : 'github'"
          :size="16"
        />
      </span>

      <span class="min-w-0 flex-1">
        <span class="block text-[0.65rem] tracking-[0.22em] uppercase" style="color: var(--muted-foreground)">
          {{ L(channel.label) }}
        </span>
        <span
          class="mt-1 block truncate text-[0.72rem] leading-snug font-medium transition-colors duration-300 group-hover:text-[color:var(--em)] sm:text-[0.8rem]"
          style="color: var(--foreground)"
          :title="channel.value"
        >
          {{ channel.value }}
        </span>
      </span>

      <ArrowUpRight
        :size="15"
        class="shrink-0 opacity-0 transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        style="color: var(--accent)"
      />
    </a>
  </div>
</template>
