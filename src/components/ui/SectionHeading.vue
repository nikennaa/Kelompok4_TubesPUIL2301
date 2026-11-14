<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <header class="section-heading">
    <p v-if="subtitle" class="section-heading-subtitle">{{ subtitle }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="section-heading-description">{{ description }}</p>
  </header>
</template>