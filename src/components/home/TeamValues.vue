<script setup>
import { teamValues } from '../../data/value'
</script>

<template>
  <section class="home-section">
    <div class="container">
      <header class="home-section-heading">
        <h2>Nilai dan Fokus Tim</h2>
        <h3>Prinsip Kerja Kelompok 4</h3>
        <p>Nilai yang menjadi dasar kami dalam belajar, bekerja, dan menciptakan solusi.</p>
      </header>

      <div class="home-values-grid">
        <article v-for="value in teamValues" :key="value.number" class="home-value-card">
          <span>{{ value.number }}</span>
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.home-value-card {
  padding: 22px;
  border: 1px solid var(--pink-line);
  border-radius: 17px;
  background: var(--white);
  transition:
    transform 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
}

.home-value-card:hover {
  transform: translateY(-5px);
  border-color: var(--pink);
  box-shadow: 0 12px 30px var(--pink-shadow);
}

.home-value-card > span {
  font:
    700 12px Manrope,
    sans-serif;
}

.home-value-card h3 {
  margin: 24px 0 8px;
  font:
    700 17px Manrope,
    sans-serif;
}

.home-value-card p {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
}

@media (max-width: 800px) {
  .home-values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .home-values-grid {
    gap: 9px;
  }

  .home-value-card {
    padding: 15px;
  }

  .home-value-card h3 {
    margin-top: 17px;
    font-size: 14px;
  }

  .home-value-card p {
    font-size: 11px;
  }
}
</style>
