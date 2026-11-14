<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { navLinks as links } from '../../data/navigation'

const menuOpen = ref(false)
const route = useRoute()

const isActive = (link) => link.match.includes(route.name)
</script>

<template>
  <header class="navbar">
    <RouterLink :to="{ name: 'home' }" class="brand" @click="menuOpen = false">
      GROUP04
    </RouterLink>

    <button
      class="mobile-menu"
      type="button"
      aria-label="Toggle menu"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      <!-- ikon inline SVG (tanpa library ikon tambahan) -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <template v-if="menuOpen">
          <path d="M6 6l12 12M18 6L6 18" />
        </template>
        <template v-else>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </template>
      </svg>
    </button>

    <nav :class="['nav-links', { open: menuOpen }]" aria-label="Main navigation">
      <RouterLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        :class="{ active: isActive(link) }"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>
