
<script setup>
import { computed, nextTick, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMembersStore } from '../stores/members'
import SocialIcon from '../components/ui/SocialIcon.vue'

const route = useRoute()
const store = useMembersStore()
const { members, status } = storeToRefs(store)

onMounted(() => {
  if (status.value === 'idle') store.fetchProfiles()
  nextTick(scrollToActive)
})

// ?member=<id> -> angka bulat atau null
const requestedId = computed(() => {
  const raw = route.query.member
  if (raw === undefined || raw === null || raw === '') return null

  const n = Number(raw)
  return Number.isInteger(n) ? n : null
})

// Hanya ID yang benar-benar ada yang dianggap aktif
const activeId = computed(() =>
  members.value.some((m) => m.id === requestedId.value)
    ? requestedId.value
    : null,
)

// Scroll menuju kartu anggota yang dipilih
function scrollToActive() {
  if (activeId.value !== null) {
    document
      .getElementById(`member-${activeId.value}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else if (requestedId.value !== null && members.value.length) {
    window.scrollTo({ top: 0 })
  }
}

watch(
  [requestedId, () => members.value.length],
  () => nextTick(scrollToActive),
)

// Tampilan anggota
const failedAvatars = reactive({})
const displayName = (m) => m.shortName || m.name
const initial = (m) => (displayName(m) || '?').charAt(0).toUpperCase()

const isRealLink = (url) =>
  typeof url === 'string' && url.trim() !== '' && url.trim() !== '#'
</script>

<template>
  <div>
    <!-- CONTACT HERO -->
    <section class="contact-hero container">

      <!-- LEFT: TEXT -->
      <div class="contact-hero-content">
        <span class="contact-eyebrow">LET'S CONNECT</span>

        <h1>Have an idea? Let's talk.</h1>

        <p>
          Get in touch with the members of Group 4 through
          the professional channels below.
        </p>
      </div>

      <!-- RIGHT: ANIMATED PHONE -->
      <div class="contact-animation" aria-label="Animated telephone">

        <div class="phone-circle">
          <svg
            class="phone-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.08 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69A2 2 0 0 1 22 16.92z"/>
          </svg>
        </div>

        <div class="phone-bubble">Hello!</div>

      </div>
    </section>

    <!-- CONTACT MEMBERS -->
    <section class="contact-section container">
      <div class="contact-grid">

        <article
          v-for="member in members"
          :id="`member-${member.id}`"
          :key="member.id"
          class="contact-card"
          :class="{ 'contact-card--active': member.id === activeId }"
        >

          <img
            v-if="member.avatarUrl && !failedAvatars[member.id]"
            class="contact-avatar"
            :src="member.avatarUrl"
            alt=""
            width="48"
            height="48"
            loading="lazy"
            @error="failedAvatars[member.id] = true"
          />

          <div
            v-else
            class="contact-avatar contact-avatar--initial"
            aria-hidden="true"
          >
            {{ initial(member) }}
          </div>

          <div class="contact-info">
            <h3>{{ displayName(member) }}</h3>
            <p>{{ member.role }}</p>
          </div>

          <div class="contact-actions">

            <a
              v-if="isRealLink(member.githubUrl)"
              :href="member.githubUrl"
              target="_blank"
              rel="noopener"
              :aria-label="`GitHub ${displayName(member)}`"
            >
              <SocialIcon name="github" />
              GitHub
              <span aria-hidden="true">↗️</span>
            </a>

            <a
              v-if="isRealLink(member.email)"
              :href="`mailto:${member.email}`"
              :aria-label="`Email ${displayName(member)}`"
            >
              <SocialIcon name="mail" />
              Email
              <span aria-hidden="true">↗️</span>
            </a>

            <a
              v-if="isRealLink(member.linkedin)"
              :href="member.linkedin"
              target="_blank"
              rel="noopener"
              :aria-label="`LinkedIn ${displayName(member)}`"
            >
              <SocialIcon name="linkedin" />
              LinkedIn
              <span aria-hidden="true">↗️</span>
            </a>

          </div>
        </article>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* CONTACT HERO LAYOUT */
.contact-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  min-height: 390px;
  padding-top: 65px;
  padding-bottom: 65px;
}

/* LEFT CONTENT */
.contact-hero-content {
  flex: 1;
  max-width: 680px;
}

.contact-eyebrow {
  display: inline-block;
  margin-bottom: 25px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #17152d;
}

.contact-hero-content h1 {
  margin: 0 0 22px;
  font-size: clamp(42px, 5vw, 72px);
  line-height: 1.1;
  font-weight: 750;
  letter-spacing: -2px;
  color: #ad1bb5;
}

.contact-hero-content p {
  max-width: 650px;
  margin: 0;
  font-size: 17px;
  line-height: 1.8;
  color: #17152d;
}

/* RIGHT ANIMATION */
.contact-animation {
  position: relative;
  flex: 0 0 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
}

.phone-circle {
  position: relative;
  width: 230px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(173, 27, 181, 0.4);
  border-radius: 50%;
  background: #f7edf9;
  animation: phone-float 3s ease-in-out infinite;
}

.phone-icon {
  width: 100px;
  height: 100px;
  color: #ad1bb5;
  transform-origin: center;
  animation: phone-ring 1.5s ease-in-out infinite;
}

/* HELLO BUBBLE */
.phone-bubble {
  position: absolute;
  top: 20px;
  right: -5px;
  padding: 12px 22px;
  border-radius: 30px;
  background: #ad1bb5;
  color: white;
  font-size: 16px;
  font-weight: 700;
  animation: bubble-pop 2s ease-in-out infinite;
}

/* ANIMATIONS */
@keyframes phone-ring {
  0%, 100% {
    transform: rotate(0deg);
  }

  10%, 30%, 50%, 70% {
    transform: rotate(-12deg);
  }

  20%, 40%, 60% {
    transform: rotate(12deg);
  }

  80%, 90% {
    transform: rotate(0deg);
  }
}

@keyframes phone-float {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

@keyframes bubble-pop {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-7px);
  }
}

/* CONTACT SECTION */
.contact-section {
  padding-block: 30px 80px;
}

/* GRID & CARDS */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.contact-card {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 0 15px;
  padding: 22px;
  border: 1px solid var(--pink-line);
  border-radius: 17px;
  background: var(--white);
  scroll-margin-top: 24px;
  transition:
    transform 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
}

.contact-card:hover,
.contact-card--active {
  border-color: var(--pink);
  box-shadow: 0 12px 30px var(--pink-shadow);
}

.contact-card:hover {
  transform: translateY(-5px);
}

.contact-card--active {
  border-width: 2px;
  padding: 21px;
}

/* AVATAR */
.contact-avatar {
  grid-row: span 2;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  object-fit: cover;
}

.contact-avatar--initial {
  display: grid;
  place-items: center;
  background: var(--pink);
  color: var(--white);
  font: 800 20px Manrope, sans-serif;
}

/* CARD TEXT */
.contact-info {
  min-width: 0;
}

.contact-card h3 {
  margin: 2px 0 4px;
  font: 700 19px Manrope, sans-serif;
  overflow-wrap: anywhere;
}

.contact-card p {
  min-height: 0;
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

/* SOCIAL LINKS */
.contact-actions {
  display: flex;
  grid-column: 1 / -1;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.contact-actions a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 10px;
  border-radius: 8px;
  background: var(--pink-soft);
  color: var(--ink);
  font-size: 11px;
}

.contact-actions a:hover {
  background: var(--pink);
  color: var(--white);
}

/* TABLET */
@media (max-width: 768px) {
  .contact-hero {
    gap: 25px;
    min-height: 330px;
  }

  .contact-animation {
    flex-basis: 220px;
  }

  .phone-circle {
    width: 190px;
    height: 190px;
  }

  .phone-icon {
    width: 80px;
    height: 80px;
  }

  .contact-hero-content h1 {
    font-size: 42px;
  }
}

/* MOBILE */
@media (max-width: 600px) {
  .contact-hero {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding-top: 55px;
    padding-bottom: 45px;
    gap: 20px;
  }

  .contact-hero-content h1 {
    font-size: 42px;
  }

  .contact-hero-content p {
    font-size: 15px;
  }

  .contact-animation {
    align-self: center;
    flex-basis: auto;
    min-height: 230px;
    width: 100%;
  }

  .phone-circle {
    width: 190px;
    height: 190px;
  }

  .phone-bubble {
    right: 10%;
  }

  .contact-section {
    padding-block: 30px 60px;
  }

  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-actions a {
    flex: 1;
    justify-content: center;
  }
}

/* ACCESSIBILITY */
@media (prefers-reduced-motion: reduce) {
  .contact-card,
  .phone-circle,
  .phone-icon,
  .phone-bubble {
    animation: none !important;
    transition: none;
  }
}
</style>
