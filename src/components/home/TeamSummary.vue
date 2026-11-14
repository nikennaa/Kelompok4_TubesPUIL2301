<script setup>
import { computed } from 'vue'
import { homeMembers, homeProjects } from '../../data/home'

const memberNames = homeMembers.join(', ')

const categorySummary = computed(() => {
  const counts = {}
  homeProjects.forEach((project) => {
    counts[project.category] = (counts[project.category] || 0) + 1
  })

  return Object.entries(counts)
    .map(([category, total]) => `${category} (${total})`)
    .join(', ')
})
</script>

<template>
  <section class="home-section home-section--tint">
    <div class="container">
      <header class="home-section-heading">
        <h2>Ringkasan</h2>
      </header>

      <div class="home-summary-grid">
        <div class="home-summary-item">
          <h3>Total Anggota Kelompok</h3>
          <strong class="home-summary-number">{{ homeMembers.length }}</strong>
          <p>{{ homeMembers.length }} anggota: {{ memberNames }}.</p>
        </div>

        <div class="home-summary-item">
          <h3>Total Proyek</h3>
          <strong class="home-summary-number">{{ homeProjects.length }}</strong>
          <p>{{ homeProjects.length }} proyek dengan kategori: {{ categorySummary }}.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
}

.home-summary-item h3 {
  margin: 0 0 6px;
  font:
    700 20px Manrope,
    sans-serif;
}

.home-summary-number {
  display: block;
  margin-bottom: 8px;
  color: var(--ink);
  font:
    800 64px / 1.1 Manrope,
    sans-serif;
}

.home-summary-item p {
  max-width: 460px;
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
}

@media (max-width: 700px) {
  .home-summary-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
