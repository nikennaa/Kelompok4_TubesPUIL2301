<script setup>
import { RouterLink } from 'vue-router'
import { navLinks } from '../../data/navigation'
</script>

<template>
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col">
        <RouterLink :to="{ name: 'home' }" class="brand">GROUP04</RouterLink>
        <p class="footer-tagline">We build ideas into digital experiences.</p>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">
          <!-- ikon lokasi (inline SVG) -->
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Location
        </h3>
        <p>Jakarta, Indonesia</p>
        <p class="footer-campus">Telkom University Kampus Jakarta</p>
        <p>Faculty of Industrial Engineering</p>
        <p>Bachelor’s Program in Information Systems</p>
      </div>

      <nav class="footer-col" aria-label="Quick links">
        <h3 class="footer-heading">Quick Links</h3>
        <RouterLink v-for="link in navLinks" :key="link.label" :to="link.to" class="footer-link">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>

    <p class="footer-copy">© {{ new Date().getFullYear() }} Kelompok 4. All rights reserved.</p>
  </footer>
</template>
