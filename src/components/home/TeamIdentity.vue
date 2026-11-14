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
  <section class="home-identity container">
    <div class="home-identity-copy">
      <h1 class="home-chapter-title">Halo semua, kami</h1>
      <h3 class="home-subchapter-title">KELOMPOK 4-SAGE2301</h3>
      <p class="home-identity-description">
        Kelompok 4 merupakan tim kolaboratif beranggotakan enam mahasiswa yang merancang dan
        mengembangkan berbagai proyek digital—mulai dari aplikasi web, sistem desain antarmuka,
        hingga portal analitik.
      </p>

      <AppButton :to="{ name: 'about' }">
        Meet Our Team
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </AppButton>
    </div>

    <div class="home-identity-photo">
      <img
        v-if="!photoFailed"
        :src="photoSrc"
        alt="Foto bersama anggota Kelompok 4"
        @error="photoFailed = true"
      />
      <div v-else class="home-photo-placeholder">
        <svg
          width="46"
          height="46"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
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

<style scoped>
.home-identity {
  display: grid;
  min-height: 560px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 56px;
  padding-block: 60px;
}

.home-chapter-title {
  margin: 0 0 14px;
  color: var(--pink);
  font:
    800 clamp(38px, 5.5vw, 64px) / 1.1 Manrope,
    sans-serif;
  letter-spacing: -0.04em;
}

.home-subchapter-title {
  margin: 0 0 18px;
  font:
    700 clamp(20px, 2.4vw, 26px) / 1.3 Manrope,
    sans-serif;
  letter-spacing: 0.04em;
}

.home-identity-description {
  max-width: 540px;
  margin: 0 0 30px;
  font-size: 15px;
  line-height: 1.85;
}

.home-identity-photo {
  display: grid;
  min-height: 380px;
  overflow: hidden;
  place-items: center;
  border: 1px solid var(--pink-line);
  border-radius: 24px;
  background: var(--pink-soft);
}

.home-identity-photo img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 380px;
  object-fit: cover;
}

.home-photo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .home-identity {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 700px) {
  .home-identity {
    min-height: auto;
    padding-block: 40px;
  }

  .home-identity-photo,
  .home-identity-photo img {
    min-height: 260px;
  }
}
</style>
