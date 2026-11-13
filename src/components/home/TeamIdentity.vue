<script setup>
import { ref } from 'vue'
import AppButton from '../ui/AppButton.vue'

// Foto kelompok: taruh file di public/images/team-photo.jpg
// Selama file belum ada, tampil placeholder.
// (path disimpan di variabel agar build tidak gagal saat file foto belum ada)
const photoSrc = '/images/team-photo.jpg'
const photoFailed = ref(false)
</script>

<template>
  <section class="identity container">
    <div class="identity-copy">
      <h1 class="chapter-title">Halo semua, kami</h1>
      <h3 class="subchapter-title">KELOMPOK 4-SAGE2301</h3>
      <p class="identity-description">
        Kelompok 4 merupakan tim kolaboratif beranggotakan enam mahasiswa yang merancang dan
        mengembangkan berbagai proyek digital—mulai dari aplikasi web, sistem desain antarmuka,
        hingga portal analitik.
      </p>

      <AppButton :to="{ name: 'about' }">
        Meet Our Team
        <span aria-hidden="true">→</span>
      </AppButton>
    </div>

    <div class="identity-photo">
      <img
        v-if="!photoFailed"
        :src="photoSrc"
        alt="Foto bersama anggota Kelompok 4"
        @error="photoFailed = true"
      />
      <div v-else class="photo-placeholder">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M17.5 14.2c2.4.3 4 2.2 4 5.3" />
        </svg>
        <span>Foto kelompok</span>
      </div>
    </div>
  </section>
</template>
