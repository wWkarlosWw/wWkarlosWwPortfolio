<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import { postsFor } from '@/data/blog'
import { useLocalized } from '@/composables/useT'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import PostCard from '@/components/blog/PostCard.vue'

/**
 * Últimas entradas del blog en el inicio.
 *
 * Si todavía no hay ninguna publicada la sección no se monta: en la portada
 * un hueco vacío se nota más que la ausencia del bloque.
 */
const { t } = useI18n()
const { lang } = useLocalized()

const posts = computed(() => postsFor(lang.value).slice(0, 3))
</script>

<template>
  <section v-if="posts.length" id="notes" class="section-pad" style="background: var(--surface)">
    <div class="shell">
      <div v-reveal class="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          :eyebrow="t('home.notesLabel')"
          :title="t('home.notesTitle')"
          :title-em="t('home.notesTitleEm')"
          :description="t('home.notesDescription')"
        />

        <RouterLink
          :to="{ name: 'about', hash: '#blog' }"
          class="link-underline flex shrink-0 items-center gap-2 pb-2 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[color:var(--accent)]"
          style="color: var(--muted-foreground)"
        >
          {{ t('home.notesCta') }}
          <ArrowRight :size="14" />
        </RouterLink>
      </div>

      <div class="mt-16 grid gap-px md:grid-cols-2 lg:grid-cols-3" style="background: var(--border)">
        <div v-for="(post, i) in posts" :key="post.slug" v-reveal="{ delay: i * 90 }" class="flex">
          <PostCard :post="post" class="w-full" />
        </div>
      </div>
    </div>
  </section>
</template>
