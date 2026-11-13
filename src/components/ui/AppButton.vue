<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

// Tombol reusable. Jika `to` diisi -> tampil sebagai link (RouterLink), jika tidak -> <button>.
const props = defineProps({
  to: { type: [String, Object], default: null },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'sm'].includes(value),
  },
  type: { type: String, default: 'button' },
})

const classes = computed(() => [
  'button',
  { 'button-ghost': props.variant === 'ghost', 'button-small': props.size === 'sm' },
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <button v-else :type="props.type" :class="classes">
    <slot />
  </button>
</template>
