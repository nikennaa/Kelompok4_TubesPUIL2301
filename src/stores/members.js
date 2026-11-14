import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { members as localMembers } from '../data/members'
import { fetchGithubUser, mapGithubUser } from '../services/githubApi'

// Store anggota tim: menggabungkan data lokal (peran, keahlian, kontak)
// dengan data dari GitHub REST API (avatar, bio, jumlah repo).
//
// status: 'idle' | 'loading' | 'success' | 'error' | 'empty'
//   empty = belum ada anggota yang punya githubUsername
//   error = SEMUA permintaan gagal (kartu tetap tampil dari data lokal)
export const useMembersStore = defineStore('members', () => {
  const status = ref('idle')
  const profiles = ref({}) // { [username]: profil hasil mapGithubUser }
  const failures = ref({}) // { [username]: GithubApiError }

  const members = computed(() =>
    localMembers.map((member) => {
      const profile = profiles.value[member.githubUsername]
      const username = member.githubUsername

      return {
        ...member,
        // nama diambil dari field "name" GitHub; cadangan: nama lokal
        name: profile?.name || member.name,
        // nama depan pendek untuk tombol (mis. "Contact Niken"); dari data lokal 'NIKEN' -> 'Niken'
        shortName: member.name.charAt(0).toUpperCase() + member.name.slice(1).toLowerCase(),
        avatarUrl: profile?.avatarUrl ?? null,
        // bio GitHub sering kosong -> pakai bio lokal sebagai cadangan
        bio: profile?.bio || member.bio,
        githubUrl: profile?.profileUrl || (username ? `https://github.com/${username}` : member.github),
        fromGithub: Boolean(profile),
      }
    }),
  )

  const failedCount = computed(() => Object.keys(failures.value).length)
  const errorMessage = computed(() => Object.values(failures.value)[0]?.message ?? '')

  async function fetchProfiles({ force = false } = {}) {
    if (status.value === 'loading') return

    const withUsername = localMembers.filter((member) => member.githubUsername)
    if (withUsername.length === 0) {
      status.value = 'empty'
      return
    }

    status.value = 'loading'

    // allSettled: satu anggota gagal tidak menggagalkan anggota lain
    const results = await Promise.allSettled(
      withUsername.map((member) => fetchGithubUser(member.githubUsername, { force })),
    )

    const nextProfiles = {}
    const nextFailures = {}
    results.forEach((result, index) => {
      const username = withUsername[index].githubUsername
      if (result.status === 'fulfilled') nextProfiles[username] = mapGithubUser(result.value)
      else nextFailures[username] = result.reason
    })

    profiles.value = nextProfiles
    failures.value = nextFailures
    status.value = Object.keys(nextProfiles).length === 0 ? 'error' : 'success'
  }

  return { status, members, failedCount, errorMessage, fetchProfiles }
})
