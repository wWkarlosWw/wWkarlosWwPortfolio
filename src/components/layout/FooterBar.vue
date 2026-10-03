<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUp, ArrowUpRight } from '@lucide/vue'
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
  <footer class="tone-dark relative overflow-hidden">
    <div class="shell-wide pb-10 pt-20 sm:pt-28">
      <div class="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr]">
        <!-- Cierre: la invitación en grande -->
        <div>
          <p class="eyebrow">{{ t('footer.tagline') }}</p>
          <p class="title display-lg mt-5">
            <span class="title-sans">{{ t('footer.ctaTitle') }}</span>
            <span class="title-serif">{{ t('footer.ctaTitleEm') }}</span>
          </p>
          <RouterLink v-magnetic :to="{ name: 'contact' }" class="btn btn-green mt-9">
            {{ t('nav.cta') }}
            <ArrowUpRight :size="14" />
          </RouterLink>
        </div>

        <!-- Navegación -->
        <nav :aria-label="t('footer.navTitle')">
          <p class="eyebrow">{{ t('footer.navTitle') }}</p>
          <ul class="mt-6 space-y-3">
            <li v-for="link in navLinks" :key="link.name">
              <RouterLink :to="{ name: link.name }" class="footer-link link-underline">
                {{ t(link.key) }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Contacto -->
        <div>
          <p class="eyebrow">{{ t('footer.contactTitle') }}</p>
          <ul class="mt-6 space-y-3">
            <li>
              <a :href="`mailto:${profile.email}`" class="footer-link link-underline break-all">
                {{ profile.email }}
              </a>
            </li>
            <li>
              <a
                :href="`https://wa.me/${profile.whatsapp}`"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link link-underline"
              >
                {{ profile.phone }}
              </a>
            </li>
            <li class="text-sm" style="color: var(--muted-foreground)">
              Cochabamba, Bolivia · {{ profile.timezone }}
            </li>
          </ul>

          <div class="mt-7 flex items-center gap-2">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="social flex size-11 items-center justify-center rounded-full border"
              :aria-label="s.label"
            >
              <BrandIcon :name="s.name" :size="16" />
            </a>
          </div>
        </div>
      </div>

      <!-- Firma a todo el ancho -->
      <div class="mt-20 flex items-end gap-5 border-t pt-10" style="border-color: var(--border)">
        <span class="w-14 shrink-0 sm:w-20" style="color: var(--em)"><WkLogoIcon /></span>
        <p class="signature" aria-hidden="true">Karlos Batista</p>
      </div>

      <div class="mt-8 flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center" style="color: var(--muted-foreground)">
        <p>© {{ year }} {{ t('footer.copyright') }}</p>
        <p>{{ t('footer.builtWith') }}</p>
        <button
          class="flex cursor-pointer items-center gap-2 font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[color:var(--em)]"
          @click="toTop"
        >
          <ArrowUp :size="13" />
          Top
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  font-size: 0.95rem;
  color: var(--foreground);
  transition: color 0.3s var(--ease-out-soft);
}
.footer-link:hover {
  color: var(--em);
}

.social {
  border-color: var(--border);
  color: var(--muted-foreground);
  transition:
    color 0.3s var(--ease-out-soft),
    border-color 0.3s var(--ease-out-soft),
    transform 0.4s var(--ease-out-soft);
}
.social:hover {
  color: var(--em);
  border-color: var(--em);
  transform: translateY(-2px);
}

.signature {
  font-family: var(--font-display);
  font-size: clamp(3rem, 12vw, 13rem);
  line-height: 0.8;
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: var(--foreground);
}
</style>
