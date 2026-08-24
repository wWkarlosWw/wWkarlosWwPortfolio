<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from '@lucide/vue'
import { useContactForm } from '@/composables/useContactForm'

const { t } = useI18n()
const { fields, status, errorFor, touch, submit } = useContactForm()

const inputClass =
  'w-full border px-4 py-3 text-sm font-light transition-colors duration-300 ' +
  'placeholder:opacity-45 focus:outline-none'

const inputStyle = {
  background: 'var(--input-background)',
  borderColor: 'var(--border)',
  color: 'var(--foreground)',
}

function onFocus(e: FocusEvent) {
  ;(e.target as HTMLElement).style.borderColor = 'var(--accent)'
}

function onBlur(e: FocusEvent, field: 'name' | 'email' | 'subject' | 'message') {
  ;(e.target as HTMLElement).style.borderColor = 'var(--border)'
  touch(field)
}
</script>

<template>
  <form class="space-y-5" novalidate @submit.prevent="submit">
    <div class="grid gap-5 sm:grid-cols-2">
      <div>
        <label for="cf-name" class="block text-[0.65rem] tracking-[0.22em] uppercase" style="color: var(--muted-foreground)">
          {{ t('contact.form.name') }}
        </label>
        <input
          id="cf-name"
          v-model="fields.name"
          type="text"
          autocomplete="name"
          :placeholder="t('contact.form.namePlaceholder')"
          :class="['mt-2', inputClass]"
          :style="inputStyle"
          @focus="onFocus"
          @blur="onBlur($event, 'name')"
        />
        <p v-if="errorFor('name')" class="mt-1.5 text-xs" style="color: var(--destructive)">
          {{ t(`contact.form.${errorFor('name')}`) }}
        </p>
      </div>

      <div>
        <label for="cf-email" class="block text-[0.65rem] tracking-[0.22em] uppercase" style="color: var(--muted-foreground)">
          {{ t('contact.form.email') }}
        </label>
        <input
          id="cf-email"
          v-model="fields.email"
          type="email"
          autocomplete="email"
          :placeholder="t('contact.form.emailPlaceholder')"
          :class="['mt-2', inputClass]"
          :style="inputStyle"
          @focus="onFocus"
          @blur="onBlur($event, 'email')"
        />
        <p v-if="errorFor('email')" class="mt-1.5 text-xs" style="color: var(--destructive)">
          {{ t(`contact.form.${errorFor('email')}`) }}
        </p>
      </div>
    </div>

    <div>
      <label for="cf-subject" class="block text-[0.65rem] tracking-[0.22em] uppercase" style="color: var(--muted-foreground)">
        {{ t('contact.form.subject') }}
      </label>
      <input
        id="cf-subject"
        v-model="fields.subject"
        type="text"
        :placeholder="t('contact.form.subjectPlaceholder')"
        :class="['mt-2', inputClass]"
        :style="inputStyle"
        @focus="onFocus"
        @blur="onBlur($event, 'subject')"
      />
    </div>

    <div>
      <label for="cf-message" class="block text-[0.65rem] tracking-[0.22em] uppercase" style="color: var(--muted-foreground)">
        {{ t('contact.form.message') }}
      </label>
      <textarea
        id="cf-message"
        v-model="fields.message"
        rows="6"
        :placeholder="t('contact.form.messagePlaceholder')"
        :class="['mt-2 resize-none', inputClass]"
        :style="inputStyle"
        @focus="onFocus"
        @blur="onBlur($event, 'message')"
      />
      <p v-if="errorFor('message')" class="mt-1.5 text-xs" style="color: var(--destructive)">
        {{ t(`contact.form.${errorFor('message')}`) }}
      </p>
    </div>

    <button type="submit" class="btn btn-gold w-full" :disabled="status === 'sending'">
      <template v-if="status === 'sending'">
        <LoaderCircle :size="14" class="animate-spin" />
        {{ t('contact.form.sending') }}
      </template>
      <template v-else-if="status === 'sent'">
        <CircleCheck :size="14" />
        {{ t('contact.form.sent') }}
      </template>
      <template v-else>
        {{ t('contact.form.submit') }}
        <Send :size="14" />
      </template>
    </button>

    <!-- Avisos posteriores al envío -->
    <Transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0"
    >
      <p
        v-if="status === 'sent'"
        class="flex items-center gap-2 text-sm font-light"
        style="color: var(--accent)"
      >
        <CircleCheck :size="14" />
        {{ t('contact.form.sentDetail') }}
      </p>
      <p
        v-else-if="status === 'error'"
        class="flex items-center gap-2 text-sm font-light"
        style="color: var(--destructive)"
      >
        <CircleAlert :size="14" />
        {{ t('contact.form.errorDetail') }}
      </p>
    </Transition>
  </form>
</template>
