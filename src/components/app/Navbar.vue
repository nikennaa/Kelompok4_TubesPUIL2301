<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

// `match` = nama route yang membuat menu ini berstatus aktif
const links = [
  { label: 'Home', to: { name: 'home' }, match: ['home'] },
  { label: 'About Team', to: { name: 'about' }, match: ['about'] },
  { label: 'Projects Showcase', to: { name: 'projects' }, match: ['projects', 'project-detail'] },
  { label: 'Contact', to: { name: 'contact' }, match: ['contact'] },
]

const isActive = (link) => link.match.includes(route.name)
</script>

<template>
  <header class="navbar">
    <RouterLink :to="{ name: 'home' }" class="brand" @click="menuOpen = false">
      <span class="brand-mark">K4</span>
      <span>GROUP.04</span>
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
