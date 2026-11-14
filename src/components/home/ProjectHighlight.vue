<script setup>
import { homeProjects } from '../../data/home'
import AppButton from '../ui/AppButton.vue'
</script>

<template>
  <section class="home-section home-section--tint">
    <div class="container">
      <header class="home-section-heading">
        <h2>Projects Highlight</h2>
        <h3>Featured Projects</h3>
        <p>Tiga proyek pilihan yang menjadi bagian dari perjalanan kami.</p>
      </header>

      <div class="home-project-grid">
        <article v-for="project in homeProjects" :key="project.id" class="home-project-card">
          <div class="home-project-cover">
            <span class="home-project-cover-label">PROJECT / {{ project.id.toUpperCase() }}</span>
          </div>

          <div class="home-project-content">
            <div class="home-project-meta">
              <span>{{ project.category }}</span>
              <span>{{ project.members.length }} contributors</span>
            </div>

            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>

            <div class="home-project-tags">
              <span v-for="technology in project.technologies" :key="technology">
                {{ technology }}
              </span>
            </div>

            <AppButton :to="{ name: 'projects' }" size="sm">
              View Detail Project
              <span aria-hidden="true">↗</span>
            </AppButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.home-project-card {
  overflow: hidden;
  border: 1px solid var(--pink-line);
  border-radius: 17px;
  background: var(--white);
  transition:
    transform 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
}

.home-project-card:hover {
  transform: translateY(-5px);
  border-color: var(--pink);
  box-shadow: 0 12px 30px var(--pink-shadow);
}

.home-project-cover {
  position: relative;
  height: 170px;
  overflow: hidden;
  padding: 20px;
  background: linear-gradient(135deg, var(--pink), var(--pink-deep));
}

.home-project-cover::after {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 28px 28px;
  content: '';
}

.home-project-cover-label {
  position: relative;
  z-index: 1;
  color: var(--white);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.home-project-content {
  padding: 23px;
}

.home-project-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 10px;
}

.home-project-content h3 {
  margin: 12px 0 8px;
  font:
    700 19px Manrope,
    sans-serif;
}

.home-project-content > p {
  min-height: 42px;
  font-size: 12px;
  line-height: 1.7;
}

.home-project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 17px 0;
}

.home-project-tags span {
  padding: 6px 9px;
  border: 1px solid var(--pink-line);
  border-radius: 6px;
  background: var(--pink-soft);
  color: var(--ink);
  font-size: 10px;
}

@media (max-width: 900px) {
  .home-project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .home-project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
