<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUp, Mail } from '@lucide/vue'
import { profile } from '@/data/profile'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import WkLogoIcon from '@/components/ui/WkLogoIcon.vue'

const { t } = useI18n()

const year = new Date().getFullYear()

const navLinks = [
  { name: 'home', key: 'nav.home' },
  { name: 'about', key: 'nav.about' },
  { name: 'projects', key: 'nav.projects' },
  { name: 'contact', key: 'nav.contact' },
] as const

const socials = [
  { name: 'github' as const, href: profile.github, label: 'GitHub' },
  { name: 'linkedin' as const, href: profile.linkedin, label: 'LinkedIn' },
  { name: 'whatsapp' as const, href: `https://wa.me/${profile.whatsapp}`, label: 'WhatsApp' },
  { name: 'x' as const, href: profile.twitter, label: 'X' },
]

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative overflow-hidden" style="background: var(--surface)">
    <div class="gold-rule" />

    <div class="shell py-16">
      <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <!-- Marca -->
        <div>
          <div class="flex items-center gap-3">
            <span class="size-11 [&>svg]:size-full" style="color: var(--accent)">
              <WkLogoIcon />
            </span>
            <span class="font-display text-2xl" style="color: var(--foreground)">
              Karlos Batista
            </span>
          </div>
          <p class="mt-4 max-w-xs text-sm font-light leading-relaxed" style="color: var(--muted-foreground)">
            {{ t('footer.tagline') }}
          </p>

          <div class="mt-6 flex items-center gap-2">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 items-center justify-center border transition-all duration-300 hover:-translate-y-0.5"
              style="border-color: var(--border); color: var(--muted-foreground)"
              :aria-label="s.label"
              @mouseenter="(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--accent)'
                el.style.borderColor = 'var(--accent)'
              }"
              @mouseleave="(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--muted-foreground)'
                el.style.borderColor = 'var(--border)'
              }"
            >
              <BrandIcon :name="s.name" :size="16" />
            </a>
          </div>
        </div>

        <!-- Navegación -->
        <div>
          <p class="eyebrow">{{ t('footer.navTitle') }}</p>
          <ul class="mt-5 space-y-3">
            <li v-for="link in navLinks" :key="link.name">
              <RouterLink
                :to="{ name: link.name }"
                class="link-underline text-sm font-light transition-colors duration-300 hover:text-[color:var(--accent)]"
                style="color: var(--muted-foreground)"
              >
                {{ t(link.key) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contacto -->
        <div>
          <p class="eyebrow">{{ t('footer.contactTitle') }}</p>
          <ul class="mt-5 space-y-3 text-sm font-light" style="color: var(--muted-foreground)">
            <li>
              <a
                :href="`mailto:${profile.email}`"
                class="link-underline inline-flex items-center gap-2 break-all transition-colors duration-300 hover:text-[color:var(--accent)]"
              >
                <Mail :size="13" class="shrink-0" />
                {{ profile.email }}
              </a>
            </li>
            <li>
              <a
                :href="`https://wa.me/${profile.whatsapp}`"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline inline-flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--accent)]"
              >
                <BrandIcon name="whatsapp" :size="13" />
                {{ profile.phone }}
              </a>
            </li>
            <li>Cochabamba, Bolivia · {{ profile.timezone }}</li>
          </ul>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
        style="border-color: var(--border)"
      >
        <p class="text-xs tracking-wide" style="color: var(--muted-foreground)">
          © {{ year }} {{ t('footer.copyright') }}
        </p>
        <p class="text-xs tracking-wide" style="color: var(--muted-foreground)">
          {{ t('footer.builtWith') }}
        </p>
        <button
          class="flex cursor-pointer items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[color:var(--accent)]"
          style="color: var(--muted-foreground)"
          @click="toTop"
        >
          <ArrowUp :size="13" />
          Top
        </button>
      </div>
    </div>
  </footer>
</template>
