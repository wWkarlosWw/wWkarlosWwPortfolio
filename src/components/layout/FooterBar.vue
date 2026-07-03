<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Code2, Globe, Mail } from "@lucide/vue";

const { t } = useI18n();
</script>

<template>
  <footer
    class="border-t py-10"
    :style="{
      borderColor: 'var(--border)',
      backgroundColor: 'var(--background)',
    }"
  >
    <div
      class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <span class="text-lg font-bold" :style="{ color: 'var(--accent)' }">
        wWkarlosWw
      </span>
      <p
        class="text-xs tracking-wider"
        :style="{ color: 'var(--muted-foreground)' }"
      >
        {{ t("footer.copyright") }}
      </p>
      <div class="flex items-center gap-4">
        <button
          v-for="(Icon, i) in [Code2, Globe, Mail]"
          :key="i"
          class="transition-colors"
          :style="{ color: 'var(--muted-foreground)' }"
          aria-label="Social link"
        >
          <Icon :size="16" />
        </button>
      </div>
    </div>
  </footer>
</template>
