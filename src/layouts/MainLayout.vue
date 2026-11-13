<script setup>
import { RouterView } from 'vue-router'
import Navbar from '../components/app/Navbar.vue'
import Footer from '../components/app/Footer.vue'
</script>

<template>
  <div class="app-shell">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
