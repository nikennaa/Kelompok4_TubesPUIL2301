<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div>
      <RouterLink :to="{ name: 'home' }" class="brand">
        <span class="brand-mark">K4</span>
        <span>GROUP.04</span>
      </RouterLink>
      <p>We build ideas into digital experiences.</p>
    </div>

    <p>© {{ new Date().getFullYear() }} Kelompok 4. All rights reserved.</p>
  </footer>
</template>
