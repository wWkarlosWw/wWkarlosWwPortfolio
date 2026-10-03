<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from '@lucide/vue'
import { formatDate } from '@/data/blog'
import { useLocalized } from '@/composables/useT'
import type { BlogPost } from '@/data/types'

defineProps<{ post: BlogPost }>()

const { t } = useI18n()
const { lang } = useLocalized()
</script>

<template>
  <RouterLink
    :to="{ name: 'blog-post', params: { slug: post.slug } }"
    class="group flex flex-col p-7 sm:p-8"
  >
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] tracking-[0.14em] whitespace-nowrap uppercase" style="color: var(--muted-foreground)">
      <time :datetime="post.date">{{ formatDate(post.date, lang) }}</time>
      <span class="size-1 rounded-full" style="background: var(--accent)" />
      <span>{{ post.readingTime }} {{ t('common.minRead') }}</span>
    </div>

    <h3
      class="mt-4 font-display text-2xl leading-snug text-balance transition-colors duration-400 group-hover:text-[color:var(--em)]"
      style="color: var(--foreground)"
    >
      {{ post.title }}
    </h3>

    <p class="mt-3 flex-1 text-sm leading-relaxed text-pretty" style="color: var(--muted-foreground)">
      {{ post.excerpt }}
    </p>

    <div class="mt-6 flex items-end justify-between gap-4">
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="rounded-full border px-2.5 py-1 text-[0.62rem] tracking-wide"
          style="border-color: var(--border); color: var(--muted-foreground)"
        >
          {{ tag }}
        </span>
      </div>

      <ArrowUpRight
        :size="16"
        class="shrink-0 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1"
        style="color: var(--em)"
      />
    </div>
  </RouterLink>
</template>
