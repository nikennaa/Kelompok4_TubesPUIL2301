<script setup>
import { ref, watch } from 'vue'
import AppButton from '../ui/AppButton.vue'

// member = data lokal + data GitHub yang sudah digabung di stores/members.js
const props = defineProps({
  member: { type: Object, required: true },
})

// Jika foto gagal dimuat, kembali ke placeholder inisial
const photoFailed = ref(false)
watch(
  () => props.member.avatarUrl,
  () => {
    photoFailed.value = false
  },
)
</script>

<template>
  <article class="member-card">
    <div class="member-photo">
      <img
        v-if="member.avatarUrl && !photoFailed"
        :src="member.avatarUrl"
        :alt="`Foto profil GitHub ${member.name}`"
        loading="lazy"
        @error="photoFailed = true"
      />
      <span v-else class="member-initial" aria-hidden="true">{{ member.name.charAt(0) }}</span>
    </div>

    <div class="member-body">
      <span class="member-role">{{ member.role }}</span>
      <h3>{{ member.name }}</h3>
      <p class="member-bio">{{ member.bio }}</p>

      <div class="member-tags">
        <span v-for="skill in member.skills" :key="skill" class="member-tag">
          {{ skill }}
        </span>
      </div>

      <!-- Halaman Contact membaca ?member=<id> lalu menggulir ke kartu anggota ini -->
      <AppButton
        class="member-contact"
        :to="{ name: 'contact', query: { member: member.id } }"
        :aria-label="`Contact ${member.shortName}`"
      >
        Contact {{ member.shortName }}
        <span aria-hidden="true">→</span>
      </AppButton>
    </div>
  </article>
</template>

<style scoped>
.member-card {
  display: flex;
  min-width: 0; /* cegah isi melebarkan kartu di dalam grid */
  flex-direction: column;
  padding: 10px;
  border: 1px solid var(--pink-line);
  border-radius: 24px;
  background: var(--white);
  box-shadow: 0 10px 30px rgba(16, 5, 38, 0.06);
  transition:
    transform 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
}

.member-card:hover {
  transform: translateY(-5px);
  border-color: var(--pink);
  box-shadow: 0 16px 36px var(--pink-shadow);
}

.member-photo {
  display: grid;
  aspect-ratio: 4 / 5;
  place-items: center;
  overflow: hidden;
  border-radius: 18px;
  background: var(--pink-soft);
}

.member-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-initial {
  color: var(--pink);
  font:
    800 72px Manrope,
    sans-serif;
}

.member-body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  padding: 18px 12px 12px;
}

.member-role {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.member-card h3 {
  margin: 6px 0 8px;
  font:
    700 20px / 1.3 Manrope,
    sans-serif;
  overflow-wrap: anywhere;
}

.member-bio {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
  overflow-wrap: anywhere;
}

.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 16px 0 20px;
}

.member-tag {
  max-width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--pink-line);
  border-radius: 6px;
  background: var(--pink-soft);
  color: var(--ink);
  font-size: 11px;
  overflow-wrap: anywhere;
}

/* tombol selalu di dasar kartu & selebar kartu -> tidak pernah keluar */
.member-contact {
  width: 100%;
  min-width: 0;
  margin-top: auto;
  text-align: center;
  overflow-wrap: anywhere;
}

@media (max-width: 700px) {
  .member-photo {
    aspect-ratio: 1 / 1;
  }
}
</style>
