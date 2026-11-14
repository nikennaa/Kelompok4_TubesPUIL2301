<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMembersStore } from '../stores/members'
import MemberCard from '../components/team/MemberCard.vue'
import AppButton from '../components/ui/AppButton.vue'

const store = useMembersStore()
const { status, members, failedCount, errorMessage } = storeToRefs(store)

// Ambil profil dari GitHub REST API saat halaman dibuka (hasilnya di-cache 15 menit)
onMounted(() => {
  if (status.value === 'idle') store.fetchProfiles()
})
</script>

<template>
  <div>
    <section class="about-hero container">
      <div class="about-hero-copy">
        <span class="about-eyebrow">GET TO KNOW US</span>
        <h1>Our Team</h1>
        <p>Kenali orang-orang di balik Kelompok 4, keahlian, dan hal yang mereka bawa ke dalam tim.</p>
      </div>

      <!-- dekoratif saja, jadi disembunyikan dari pembaca layar -->
      <div class="about-hero-emoji" aria-hidden="true">
        <span class="about-hi">Hi!</span>
        <span class="about-wave">👋</span>
      </div>
    </section>

    <section class="about-section container">

      <!-- Kondisi data API: loading / error / sebagian gagal. Kartu selalu tampil (fallback data lokal). -->
      <p v-if="status === 'loading'" class="about-status" role="status">
        Memuat profil dari GitHub…
      </p>

      <div v-else-if="status === 'error'" class="about-status about-status--error" role="alert">
        <span>{{ errorMessage }} Menampilkan data lokal.</span>
        <AppButton variant="ghost" size="sm" @click="store.fetchProfiles({ force: true })">
          Coba lagi
        </AppButton>
      </div>

      <p v-else-if="status === 'success' && failedCount > 0" class="about-status" role="status">
        {{ failedCount }} profil gagal diambil dari GitHub dan memakai data lokal.
      </p>

      <div class="about-grid" :aria-busy="status === 'loading'">
        <MemberCard v-for="member in members" :key="member.id" :member="member" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 32px;
  padding-block: 80px 20px;
}

.about-hero-emoji {
  position: relative;
  display: grid;
  width: 190px;
  height: 190px;
  place-items: center;
  border: 1px solid var(--pink-line);
  border-radius: 50%;
  background: var(--tint);
}

.about-wave {
  display: inline-block;
  font-size: 88px;
  line-height: 1;
  transform-origin: 70% 70%;
  animation: about-wave 2.4s ease-in-out infinite;
}

/* gelembung "Hi!" di pojok kanan atas lingkaran */
.about-hi {
  position: absolute;
  top: 6px;
  right: -6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--pink);
  color: var(--white);
  font:
    700 14px Manrope,
    sans-serif;
}

@keyframes about-wave {
  0%,
  60%,
  100% {
    transform: rotate(0);
  }
  10%,
  30% {
    transform: rotate(16deg);
  }
  20%,
  40% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(8deg);
  }
}

/* hormati pengguna yang mematikan animasi di sistemnya */
@media (prefers-reduced-motion: reduce) {
  .about-wave {
    animation: none;
  }
}

.about-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.17em;
}

.about-hero h1 {
  max-width: 680px;
  margin-block: 18px;
  color: var(--pink);
  font:
    800 clamp(38px, 5vw, 60px) / 1.1 Manrope,
    sans-serif;
  letter-spacing: -0.04em;
}

.about-hero p {
  max-width: 560px;
  font-size: 14px;
  line-height: 1.85;
}

.about-section {
  padding-block: 80px;
}

.about-heading {
  margin-bottom: 36px;
}

.about-heading h2 {
  margin: 0 0 10px;
  color: var(--pink);
  font:
    800 clamp(30px, 4vw, 44px) / 1.2 Manrope,
    sans-serif;
  letter-spacing: -0.03em;
}

.about-heading h3 {
  margin: 0 0 10px;
  font:
    700 20px Manrope,
    sans-serif;
}

.about-heading p {
  max-width: 600px;
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
}

.about-status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 20px;
  padding: 12px 16px;
  border: 1px solid var(--pink-line);
  border-radius: 12px;
  background: var(--tint);
  font-size: 13px;
}

.about-status--error {
  border-color: var(--pink);
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

@media (max-width: 800px) {
  .about-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .about-hero {
    grid-template-columns: 1fr;
    padding-top: 55px;
  }

  .about-hero-emoji {
    width: 130px;
    height: 130px;
    order: -1; /* di mobile tampil di atas teks */
  }

  .about-wave {
    font-size: 60px;
  }

  .about-section {
    padding-block: 60px;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
