<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from '@lucide/vue'
import { projectShot } from '@/data/projectShots'
import { useLocalized } from '@/composables/useT'
import type { Project } from '@/data/types'

/**
 * Ficha de proyecto, como una pieza en una vitrina.
 *
 * Un marco de borde fino con la captura (o el nombre, si aún no hay captura)
 * y una muesca abajo con el título y el año. En reposo la pieza está apagada;
 * al pasar el cursor el marco se enciende, la captura recupera el color y
 * aparece el resumen.
 */
const props = defineProps<{ project: Project }>()

const { t } = useI18n()
const { L } = useLocalized()

const image = computed(() => projectShot(props.project.slug))

/** Año de cierre: el último de cuatro cifras que aparezca en el periodo. */
const year = computed(() => props.project.period?.match(/\d{4}/g)?.pop() ?? '')
</script>

<template>
  <RouterLink
    :to="{ name: 'project', params: { slug: project.slug } }"
    class="tile group relative block"
    :aria-label="`${t('common.viewProject')}: ${project.title}`"
  >
    <div class="tile-frame relative aspect-[1/1.04] overflow-hidden">
      <img
        v-if="image"
        :src="image"
        alt=""
        loading="lazy"
        class="tile-shot absolute inset-0 h-full w-full object-cover object-left-top"
      />

      <!-- Sin captura todavía: el nombre hace de pieza -->
      <p v-else class="tile-name absolute inset-0 flex items-center justify-center p-6 text-center font-display text-balance">
        {{ project.title }}
      </p>

      <!-- Categoría -->
      <span class="tile-chip absolute left-4 top-4 text-[0.6rem] font-semibold tracking-[0.2em] uppercase">
        {{ L(project.category) }}
      </span>

      <!-- Resumen: sube al pasar el cursor -->
      <div class="tile-info absolute inset-x-0 bottom-0 p-5 pb-12">
        <p class="text-sm leading-snug text-pretty">{{ L(project.summary) }}</p>
      </div>

      <span class="tile-arrow absolute right-4 top-4 flex size-9 items-center justify-center rounded-full">
        <ArrowUpRight :size="15" />
      </span>
    </div>

    <!-- Muesca: tapa la esquina del marco con el color de la sección -->
    <div class="tile-label absolute -bottom-px -right-px flex items-baseline gap-3 py-2 pl-5 pr-1">
      <span class="text-xs font-semibold tracking-wide">{{ project.title }}</span>
      <span v-if="year" class="numeric text-sm" style="color: var(--accent)">{{ year }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.tile-frame {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  transition:
    border-color 0.5s var(--ease-out-soft),
    background-color 0.5s var(--ease-out-soft);
}

.tile-shot {
  filter: grayscale(1) brightness(0.55);
  transform: scale(1.02);
  transition:
    filter 0.7s var(--ease-out-soft),
    transform 1.1s var(--ease-out-soft);
}

.tile-name {
  font-size: clamp(1.75rem, 2.6vw, 2.6rem);
  line-height: 0.98;
  color: color-mix(in srgb, var(--foreground) 55%, transparent);
  transition:
    color 0.5s var(--ease-out-soft),
    transform 0.7s var(--ease-out-soft);
}

.tile-chip {
  color: var(--muted-foreground);
  transition: color 0.4s var(--ease-out-soft);
}

.tile-info {
  color: var(--cream);
  background: linear-gradient(to top, rgba(14, 16, 15, 0.92), rgba(14, 16, 15, 0.6) 60%, transparent);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.5s var(--ease-out-soft),
    transform 0.6s var(--ease-out-soft);
}

.tile-arrow {
  background: var(--em);
  color: var(--background);
  opacity: 0;
  transform: scale(0.6) rotate(-45deg);
  transition:
    opacity 0.4s var(--ease-out-soft),
    transform 0.6s var(--ease-out-soft);
}

.tile-label {
  background: var(--background);
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
  border-top-left-radius: var(--radius);
  color: var(--foreground);
  transition: border-color 0.5s var(--ease-out-soft);
}

/* --- Encendido ------------------------------------------------------------ */
.tile:hover .tile-frame,
.tile:focus-visible .tile-frame,
.tile:hover .tile-label,
.tile:focus-visible .tile-label {
  border-color: var(--em);
}
.tile:hover .tile-shot,
.tile:focus-visible .tile-shot {
  filter: none;
  transform: scale(1.06);
}
.tile:hover .tile-name,
.tile:focus-visible .tile-name {
  color: var(--em);
  transform: translateY(-14%);
}
.tile:hover .tile-chip,
.tile:focus-visible .tile-chip {
  color: var(--em);
}
.tile:hover .tile-info,
.tile:focus-visible .tile-info,
.tile:hover .tile-arrow,
.tile:focus-visible .tile-arrow {
  opacity: 1;
  transform: none;
}
</style>
