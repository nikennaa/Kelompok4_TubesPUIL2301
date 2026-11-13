<script setup>
import { useRoute } from 'vue-router'
import AppButton from '../components/ui/AppButton.vue'

// Placeholder sementara untuk halaman yang belum dikerjakan.
// Judulnya diambil dari `meta.title` di router. Saat halaman aslinya jadi,
// cukup ganti component route-nya di router/index.js.
const route = useRoute()
</script>

<template>
  <section class="coming-soon container">
    <h1>{{ route.meta.title }}</h1>
    <p>Halaman ini sedang dikerjakan di issue berikutnya.</p>
    <br />
    <AppButton :to="{ name: 'home' }" variant="ghost">Kembali ke Home</AppButton>
  </section>
</template>
