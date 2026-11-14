<script setup>
import TeamIdentity from '../components/home/TeamIdentity.vue'
import TeamSummary from '../components/home/TeamSummary.vue'
import TeamValues from '../components/home/TeamValues.vue'
import ProjectHighlight from '../components/home/ProjectHighlight.vue'
</script>

<template>
  <div class="home-page">
    <TeamIdentity />
    <TeamSummary />
    <TeamValues />
    <ProjectHighlight />
  </div>
</template>

<style scoped>
.home-page :deep(.home-section) {
  padding-block: 80px;
}

.home-page :deep(.home-section--tint) {
  background: var(--tint);
}

.home-page :deep(.home-section-heading) {
  margin-bottom: 36px;
}

.home-page :deep(.home-section-heading h2) {
  margin: 0 0 10px;
  color: var(--pink);
  font:
    800 clamp(30px, 4vw, 44px) / 1.2 Manrope,
    sans-serif;
  letter-spacing: -0.03em;
}

.home-page :deep(.home-section-heading h3) {
  margin: 0 0 10px;
  font:
    700 20px Manrope,
    sans-serif;
}

.home-page :deep(.home-section-heading p) {
  max-width: 600px;
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
}

@media (max-width: 700px) {
  .home-page :deep(.home-section) {
    padding-block: 60px;
  }
}
</style>
