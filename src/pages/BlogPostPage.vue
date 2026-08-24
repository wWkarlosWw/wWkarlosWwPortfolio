<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from '@lucide/vue'
import { findPost, formatDate, postsFor, renderPost } from '@/data/blog'
import { useLocalized } from '@/composables/useT'
import ForestBackdrop from '@/components/ui/ForestBackdrop.vue'
import PostCard from '@/components/blog/PostCard.vue'

const props = defineProps<{ slug: string }>()

const { t } = useI18n()
const { lang } = useLocalized()

const post = computed(() => findPost(props.slug, lang.value))
const html = computed(() => (post.value ? renderPost(post.value) : ''))

/** Otras entradas del mismo idioma, para seguir leyendo. */
const others = computed(() =>
  postsFor(lang.value).filter((p) => p.slug !== props.slug).slice(0, 2),
)

watch(
  post,
  (value) => {
    if (value) document.title = `${value.title} · Karlos Batista`
  },
  { immediate: true },
)
</script>

<template>
  <article v-if="post">
    <!-- ================= Encabezado ================= -->
    <header class="relative overflow-hidden pb-16 pt-40" style="background: var(--background)">
      <ForestBackdrop variant="soft" :intensity="0.7" />

      <div class="shell-narrow relative z-10">
        <RouterLink
          :to="{ name: 'about', hash: '#blog' }"
          class="link-underline inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[color:var(--accent)]"
          style="color: var(--muted-foreground)"
        >
          <ArrowLeft :size="13" />
          {{ t('common.backToBlog') }}
        </RouterLink>

        <div class="mt-10 flex flex-wrap items-center gap-3 text-[0.65rem] tracking-[0.18em] uppercase" style="color: var(--muted-foreground)">
          <time :datetime="post.date">{{ formatDate(post.date, lang) }}</time>
          <span class="size-1 rounded-full" style="background: var(--accent)" />
          <span>{{ post.readingTime }} {{ t('common.minRead') }}</span>
        </div>

        <h1 class="display-lg mt-5 text-balance" style="color: var(--foreground)">
          {{ post.title }}
        </h1>

        <p class="mt-6 font-display text-xl leading-snug text-pretty sm:text-2xl" style="color: var(--muted-foreground)">
          {{ post.excerpt }}
        </p>

        <div class="mt-8 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="border px-3 py-1.5 text-[0.62rem] tracking-wide"
            style="border-color: var(--border); color: var(--muted-foreground)"
          >
            {{ tag }}
          </span>
        </div>

        <div class="gold-rule mt-12" />
      </div>
    </header>

    <!-- ================= Cuerpo ================= -->
    <!-- El HTML viene del renderizador propio de `src/lib/markdown.ts`, que
         escapa la entrada antes de aplicar el marcado. -->
    <div class="pb-28" style="background: var(--background)">
      <div class="shell-narrow post-body" v-html="html" />
    </div>

    <!-- ================= Otras entradas ================= -->
    <section v-if="others.length" class="section-pad" style="background: var(--surface)">
      <div class="shell-narrow">
        <p class="eyebrow">{{ t('blog.otherPosts') }}</p>
        <div class="mt-8 grid gap-px sm:grid-cols-2" style="background: var(--border)">
          <PostCard v-for="other in others" :key="other.slug" :post="other" />
        </div>
      </div>
    </section>
  </article>

  <!-- ================= Sin resultado ================= -->
  <section v-else class="flex min-h-[70svh] items-center" style="background: var(--background)">
    <div class="shell-narrow text-center">
      <h1 class="display-md" style="color: var(--foreground)">{{ t('blog.notFound') }}</h1>
      <RouterLink :to="{ name: 'about', hash: '#blog' }" class="btn btn-outline mt-8">
        <ArrowLeft :size="14" />
        {{ t('common.backToBlog') }}
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* El contenido llega como HTML, así que se estiliza desde aquí en lugar de
   con clases en cada nodo. */
.post-body :deep(h1:first-child),
.post-body :deep(h2:first-child) {
  margin-top: 0;
}

.post-body :deep(p:first-child) {
  margin-top: 0;
}
</style>
