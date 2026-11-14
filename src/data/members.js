// Data anggota Kelompok 4 yang TIDAK tersedia di GitHub API:
// peran, keahlian, bio cadangan, LinkedIn, email.
// Avatar, bio GitHub, dan jumlah repo diambil dari GitHub REST API (lihat services/githubApi.js
// dan stores/members.js). Jika API gagal / username kosong, kartu memakai data di file ini.
//
// githubUsername: isi dengan username GitHub anggota (contoh: 'octocat').
//                 Kosongkan ('') bila belum ada -> kartu tampil dari data lokal.
export const members = [
  {
    id: 1,
    name: 'REFA',
    githubUsername: 'Lia-fady',
    role: 'Team Member',
    skills: ['UI/UX Design', 'Frontend'],
    bio: 'Tambahkan deskripsi singkat anggota di sini.',
    github: '#',
    email: 'refa@example.com',
    linkedin: '#',
  },
  {
    id: 2,
    name: 'NIKEN',
    githubUsername: 'nikennaa',
    role: 'Team Member',
    skills: ['System Analyst', 'Project Management'],
    bio: 'Tambahkan deskripsi singkat anggota di sini.',
    github: '#',
    email: 'niken@example.com',
    linkedin: '#',
  },
  {
    id: 3,
    name: 'ALIFFIA',
    githubUsername: 'aliffiahumaira',
    role: 'Team Member',
    skills: ['UI Design', 'Prototyping'],
    bio: 'Tambahkan deskripsi singkat anggota di sini.',
    github: '#',
    email: 'aliffia@example.com',
    linkedin: '#',
  },
  {
    id: 4,
    name: 'NADYA',
    githubUsername: 'nadyamauliida',
    role: 'Team Member',
    skills: ['Frontend', 'Testing'],
    bio: 'Tambahkan deskripsi singkat anggota di sini.',
    github: '#',
    email: 'nadya@example.com',
    linkedin: '#',
  },
  {
    id: 5,
    name: 'ALVIA',
    githubUsername: 'alivia-123',
    role: 'Team Member',
    skills: ['Backend', 'Database'],
    bio: 'Tambahkan deskripsi singkat anggota di sini.',
    github: '#',
    email: 'alvia@example.com',
    linkedin: '#',
  },
  {
    id: 6,
    name: 'DIVA',
    githubUsername: 'dipaa183',
    role: 'Team Member',
    skills: ['Project Management', 'Analysis'],
    bio: 'Tambahkan deskripsi singkat anggota di sini.',
    github: '#',
    email: 'diva@example.com',
    linkedin: '#',
  },
]
