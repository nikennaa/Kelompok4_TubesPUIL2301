# Brief: mengerjakan halaman /project (Project Showcase)

Untuk anggota yang mengerjakan **Project Showcase**. Bagian "Prompt untuk Claude" boleh disalin
ke Claude Code (jalankan dari folder repo `Kelompok4_TubesPUIL2301`).

Halaman ini juga membuat **fondasi data proyek** (data, service, store) yang nanti dipakai halaman
**Project Detail** (lihat `PROMPT_PROJECT_DETAIL.md`). Jadi PR Showcase sebaiknya masuk `main` lebih dulu.

## Prompt untuk Claude

```text
Kerjakan halaman /project (Project Showcase) di repo D:\KULIAH\SEM 7\UILANJUT\Kelompok4_TubesPUIL2301 (Vue 3 + Vite + Pinia + Vue Router).

ATURAN
- Semua perubahan ditulis di Kelompok4_TubesPUIL2301.
- D:\KULIAH\SEM 7\UILANJUT\pUI_kelompok4\kelompok4-team-portfolio hanya REFERENSI tampilan: baca saja, jangan diubah.
- Branch baru: feat/project-showcase. Lakukan git pull dari main dulu.
- Label tombol dan teks UI bahasa Inggris. Tanpa library ikon (inline SVG). Tanpa dependency baru.
- Konvensi repo ini: style komponen memakai <style scoped> dengan class berawalan nama fitur (contoh: AboutTeam.vue
  memakai about-*, MemberCard.vue memakai member-*). Jangan menaruh style baru di components.css / layout.css global.
- Jangan mengubah AboutTeam, MemberCard, Navbar, Footer, Home, Contact. Di main.css jangan ubah apa pun
  (halaman ini tidak butuh CSS global baru).

KONTRAK DATA (sama persis dengan yang dipakai halaman Project Detail, jangan diubah sepihak)
Satu sumber data: public/data/projects.json (array). Bentuk satu proyek:
  {
    "id": "gatherly",                       // slug, dipakai di URL
    "title": "Gatherly — Event Management",
    "summary": "...",
    "category": "Web Application",
    "technologies": ["Vue.js", "JavaScript", "REST API"],
    "memberIds": [1, 2, 4],                 // id anggota di src/data/members.js (BUKAN nama)
    "background": "...",
    "goals": "...",
    "features": ["...", "..."],
    "contributions": [ { "memberId": 1, "role": "UI implementation" } ],
    "screenshots": [ { "src": "/images/projects/gatherly/1.png", "caption": "..." } ],
    "repoUrl": "",                          // boleh kosong
    "demoUrl": ""                           // boleh kosong
  }
Salin isi awalnya dari referensi pUI_kelompok4/.../src/data/projects.js (3 proyek: gatherly, akademia, team-portfolio),
lalu ubah: members (nama) -> memberIds (angka: REFA=1, NIKEN=2, ALIFFIA=3, NADYA=4, ALVIA=5, DIVA=6),
contributions (string) -> objek { memberId, role }, tambah screenshots (boleh [] dulu).
id proyek HARUS sama dengan id di src/data/home.js (homeProjects) karena Home menampilkan proyek yang sama.
Proyek ke-3 (team-portfolio) di referensi hanya placeholder: ganti dengan proyek asli anggota bila sudah ada
(syarat tugas: minimal 3 proyek anggota).

LANGKAH 1 - Fondasi data (dikerjakan di PR ini)
(a) public/data/projects.json (isi seperti kontrak di atas).
(b) src/services/projectsApi.js: fungsi fetchProjects({ signal }) yang memakai fetch ke
    `${import.meta.env.BASE_URL}data/projects.json`. Tangani: jaringan gagal (pesan "Tidak bisa memuat data proyek.
    Periksa koneksi internet."), response tidak ok (pesan berisi status). Ikuti pola src/services/githubApi.js.
    Alasan memakai fetch ke file JSON: ada request-response nyata, jadi state loading/error bisa dites
    (DevTools > Network > Offline / Slow 3G). Sumber API sungguhan (mis. GitHub repos) akan diganti PIC integrasi
    API (Niken) pada tahap berikutnya; yang berubah hanya isi file service ini, UI tidak perlu diubah.
(c) src/stores/projects.js (Pinia, setup store, ikuti pola stores/members.js):
    state  : status ('idle'|'loading'|'success'|'error'), errorMessage, projects
    action : fetchProjects({ force = false } = {})  -> abaikan jika sudah 'loading'; jika sudah 'success' dan !force, tidak fetch lagi
    getter : categories (daftar kategori unik), getById(id)
(d) Halaman lain yang membutuhkan data memanggil store (onMounted: jika status 'idle' -> fetchProjects()).

LANGKAH 2 - Salin dan sesuaikan dari referensi
(a) pUI_kelompok4/.../src/views/ProjectShowcase.vue -> src/views/ProjectShowcase.vue (di repo kelompok masih kosong).
    - Ganti ikon lucide dengan inline SVG sederhana (ikon cari). Jangan pakai SectionHeading global
      (gayanya di repo ini rata tengah); tulis heading sendiri seperti di AboutTeam.vue (class showcase-*).
    - Isi: hero (eyebrow, h1 "Ideas made tangible.", paragraf), heading "Projects Showcase / Explore our projects",
      panel filter, baris hasil, grid kartu.
(b) pUI_kelompok4/.../src/components/project/ProjectCard.vue -> src/components/project/ProjectCard.vue (kosong).
    - Props: project (Object, required). Style scoped berawalan project-card-*; contek style kartu proyek
      di src/components/home/ProjectHighlight.vue (home-project-*) supaya tampilannya identik.
    - Tombol "View Detail Project" memakai AppButton dengan
      :to="{ name: 'project-detail', params: { id: project.id } }".
      Route 'project-detail' dibuat oleh pengerjaan halaman Detail; sebelum itu merge, tombol boleh menuju route 'projects'
      sementara (jangan membuat route detail di PR ini).
    - Jumlah kontributor = project.memberIds.length. Teks tidak boleh keluar kartu (overflow-wrap).
(c) pUI_kelompok4/.../src/composables/useProjectFilter.js -> src/composables/useProjectFilter.js (kosong).
    - Terima array proyek dari store (bukan import langsung data). Filter: search (judul + ringkasan, tanpa spasi berlebih,
      tidak case-sensitive), kategori, kontributor. Filter TEKNOLOGI TIDAK dipakai.
    - Filter kontributor memakai memberId (angka), label di dropdown = nama anggota dari useMembersStore().members.
      Jangan membandingkan nama (nama GitHub bisa berbeda dari nama lokal).
    - Sediakan resetFilters() dan filteredProjects (computed).

LANGKAH 3 - Empat kondisi UI (wajib, NFR-04)
 - loading : tampilkan skeleton kartu atau teks "Loading projects..." (role="status"), filter dinonaktifkan.
 - error   : pesan dari store + tombol "Try again" -> store.fetchProjects({ force: true }).
 - empty   : (a) data kosong dari sumber: "No projects yet"; (b) hasil filter kosong: "No projects found" + tombol "Clear filters".
 - success : grid kartu + baris "N project(s) found" (aria-live="polite").
 Panel filter: pencarian, kategori ("All categories"), kontributor ("All members"), tombol Reset.

LANGKAH 4 - Router
Di src/router/index.js ubah HANYA baris route 'projects':
  { path: 'project', name: 'projects', component: () => import('../views/ProjectShowcase.vue') }
ComingSoon jangan dihapus (route lain masih memakainya). Karena file ini dipakai banyak orang, git pull dulu dan
jangan mengubah baris lain. URL tetap /project (jangan ganti), nama route tetap 'projects'.

LANGKAH 5 - Uji sebelum PR (centang semua)
 - npm run dev: /project menampilkan 3 kartu; menu Projects Showcase aktif di navbar.
 - Cari "gather" -> 1 hasil. Kategori "Website" -> hanya proyek kategori itu. Kontributor "Niken" -> proyek yang memuat id 2.
 - Kombinasi search + kategori + kontributor bekerja bersamaan. "zzz" -> empty state "No projects found"; "Clear filters" mengembalikan semua.
 - DevTools Network = Offline lalu buka /project (hard reload) -> state error + "Try again" yang berfungsi setelah online.
 - Network = Slow 3G -> tampil state loading.
 - 375px dan 1280px: tanpa overflow horizontal; teks kartu tidak keluar; logo navbar sejajar dengan konten.
 - npm run build lolos tanpa error. Tidak ada href="#" dan tidak ada console error.
Commit hanya file milik tugas ini, lalu buat Pull Request ke main.
```

## Peta file

| Referensi (`pUI_kelompok4/kelompok4-team-portfolio`) | Repo kelompok (`Kelompok4_TubesPUIL2301`) | Tindakan |
|---|---|---|
| `src/data/projects.js` | `public/data/projects.json` (baru) | Ubah ke JSON dan format kontrak (`memberIds`, `contributions` objek) |
| - | `src/services/projectsApi.js` (baru) | `fetch` ke JSON, tangani error |
| - | `src/stores/projects.js` (baru) | Pinia: status, projects, fetch, getById, categories |
| `src/views/ProjectShowcase.vue` | `src/views/ProjectShowcase.vue` (kosong) | Salin + adaptasi (tanpa lucide, heading sendiri, 4 kondisi UI) |
| `src/components/project/ProjectCard.vue` | `src/components/project/ProjectCard.vue` (kosong) | Salin + style scoped |
| `src/composables/useProjectFilter.js` | `src/composables/useProjectFilter.js` (kosong) | Salin + filter berdasarkan `memberId` |
| - | `src/router/index.js` | Hanya baris route `projects` |

## Hal yang perlu diperhatikan

- **Data statis saja belum cukup untuk rubrik API.** Fetch ke `projects.json` adalah langkah awal agar 4 kondisi UI nyata
  dan bisa didemokan. Sumber API sungguhan (mis. GitHub `GET /repos/{owner}/{repo}` untuk bintang, bahasa, dan tanggal
  update) dikerjakan PIC integrasi API (Niken) lewat satu file `projectsApi.js`.
- **Filter teknologi sengaja tidak ada** (keputusan tim). Yang ada: pencarian, kategori, kontributor.
- **Home dan Showcase memakai proyek yang sama.** Pastikan `id` di `projects.json` sama dengan `src/data/home.js`.
