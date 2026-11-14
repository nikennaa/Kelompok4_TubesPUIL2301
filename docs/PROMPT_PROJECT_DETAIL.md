# Brief: mengerjakan halaman Project Detail (/project-showcase/:id)

Untuk anggota yang mengerjakan **Project Detail**. Bagian "Prompt untuk Claude" boleh disalin
ke Claude Code (jalankan dari folder repo `Kelompok4_TubesPUIL2301`).

**Ketergantungan:** halaman ini memakai data, service, dan store proyek yang dibuat di PR
**Project Showcase** (`PROMPT_PROJECT_SHOWCASE.md`). Tunggu PR itu masuk `main` (atau minta branch-nya),
lalu `git pull`. Jangan membuat ulang `projects.json`, `projectsApi.js`, atau `stores/projects.js`.

## Prompt untuk Claude

```text
Kerjakan halaman Project Detail di repo D:\KULIAH\SEM 7\UILANJUT\Kelompok4_TubesPUIL2301 (Vue 3 + Vite + Pinia + Vue Router).

ATURAN
- Semua perubahan ditulis di Kelompok4_TubesPUIL2301.
- D:\KULIAH\SEM 7\UILANJUT\pUI_kelompok4\kelompok4-team-portfolio hanya REFERENSI tampilan: baca saja, jangan diubah.
- Branch baru: feat/project-detail (setelah git pull main yang sudah berisi PR Project Showcase).
- Label tombol dan teks UI bahasa Inggris. Tanpa library ikon (inline SVG). Tanpa dependency baru.
- Jangan mengubah AboutTeam, MemberCard, Navbar, Footer, Contact, ProjectShowcase, ProjectCard.

DATA YANG SUDAH ADA (dari PR Project Showcase, jangan dibuat ulang)
 - public/data/projects.json, src/services/projectsApi.js, src/stores/projects.js (useProjectsStore: status, errorMessage,
   projects, fetchProjects({ force }), getById(id)), dan useMembersStore (src/stores/members.js: id, name, shortName, avatarUrl, role).
 - Bentuk satu proyek:
     { id, title, summary, category, technologies[], memberIds[], background, goals, features[],
       contributions: [ { memberId, role } ], screenshots: [ { src, caption } ], repoUrl, demoUrl }
 - Jika ada field yang kurang untuk tampilan detail, tambahkan ke projects.json dan kabari pengerjaan Showcase.

LANGKAH 1 - Router
Di src/router/index.js tambahkan SATU route baru di dalam children MainLayout (git pull dulu, jangan ubah baris lain):
  { path: 'project-showcase/:id', name: 'project-detail', component: () => import('../views/ProjectDetail.vue') }
Nama route harus 'project-detail' (Navbar sudah menandai menu Projects Showcase aktif untuk route ini lewat src/data/navigation.js).
Semua link memakai NAMA route: { name: 'project-detail', params: { id } }.

LANGKAH 2 - Salin dan sesuaikan dari referensi
(a) pUI_kelompok4/.../src/views/ProjectDetail.vue -> src/views/ProjectDetail.vue (di repo kelompok masih kosong).
    - Ganti ikon lucide dengan inline SVG. Ambil proyek dari store: useProjectsStore().getById(route.params.id)
      (computed, reaktif terhadap route.params.id). onMounted: jika status 'idle' -> store.fetchProjects()
      (penting: pengguna bisa membuka URL detail langsung tanpa lewat Showcase).
(b) pUI_kelompok4/.../src/assets/project-detail.css -> src/assets/project-detail.css (di repo kelompok kosong).
    Lalu aktifkan import-nya di src/assets/main.css: pindahkan HANYA baris `@import './project-detail.css';` keluar dari
    blok komentar (jangan menyentuh baris contact.css, itu milik pengerjaan Contact).
    css referensi bergantung pada style yang tidak ada di repo kelompok. Tambahkan ke project-detail.css (dengan awalan
    detail-) : .eyebrow, .tag-list/.tag, .state-card (+ .state-icon), .not-found.
    Beri awalan detail- pada class umum agar tidak bentrok dengan halaman lain; sesuaikan template-nya.

LANGKAH 3 - Isi halaman (urutan dari atas)
 1. Breadcrumb: Home / Projects Showcase / <judul proyek>. Dua segmen pertama berupa link (RouterLink nama route 'home' dan 'projects'),
    segmen terakhir teks biasa (aria-current="page"). Pakai <nav aria-label="Breadcrumb">.
 2. Tombol "Back to projects": jika pengguna datang dari Showcase gunakan router.back() agar filter/pencarian
    tidak hilang; jika halaman dibuka langsung, arahkan ke { name: 'projects' }. Cek: window.history.state?.back.
    Render sebagai <a :href> (hasil router.resolve) dengan @click.prevent agar tetap bisa dibuka di tab baru.
 3. Cover (judul, kategori, ringkasan) seperti referensi (teks putih di atas latar pink).
 4. Isi utama: Background, Objectives, Features, Contributions. Contributions = daftar { anggota, peran }:
    tampilkan avatar kecil (useMembersStore -> avatarUrl, fallback inisial), nama, dan peran.
 5. Visual documentation (BARU, syarat FR-05 yang tidak ada di referensi): galeri screenshot dari project.screenshots
    (<img loading="lazy" alt=caption>, rasio terjaga, klik untuk membuka gambar penuh di tab baru atau lightbox sederhana).
    Gambar disimpan di public/images/projects/<id>/. Jika screenshots kosong tampilkan catatan "No visual documentation yet."
    Jika satu gambar gagal dimuat, sembunyikan atau tampilkan placeholder (pola @error seperti MemberCard.vue).
 6. Sidebar: Tech Stack (tag) dan Contributors. Setiap nama kontributor adalah link ke /contact?member=<memberId>
    ({ name: 'contact', query: { member: id } }) - ini jalur dari proyek ke kontak anggota.
 7. Tombol "View repository" / "Live demo" hanya jika repoUrl / demoUrl terisi (target="_blank" rel="noopener").
 Teks panjang tidak boleh keluar dari kotak (overflow-wrap:anywhere).

LANGKAH 4 - Empat kondisi UI (wajib, NFR-04)
 - loading   : skeleton atau "Loading project..." (role="status") selama status 'loading' / 'idle'.
 - error     : errorMessage + tombol "Try again" -> store.fetchProjects({ force: true }).
 - not found : status 'success' tetapi getById(id) kosong -> "Project not found" + tombol kembali ke 'projects' (dan ke 'home').
 - success   : halaman penuh.

LANGKAH 5 - Sambungkan Home (satu baris)
Di src/components/home/ProjectHighlight.vue, tombol "View Detail Project" sekarang menuju { name: 'projects' }. Ubah :to menjadi
  { name: 'project-detail', params: { id: project.id } }
(id di src/data/home.js harus sama dengan id di projects.json; jika beda, samakan). Jangan mengubah bagian lain file itu.

LANGKAH 6 - Uji sebelum PR (centang semua)
 - Home -> klik "View Detail Project" pada tiap kartu -> detail proyek yang benar.
 - /project -> kartu -> detail -> "Back to projects" mengembalikan Showcase dengan filter/pencarian yang tadi aktif.
 - Buka langsung /project-showcase/gatherly (hard reload) -> halaman tampil (store ter-fetch), tombol Back menuju /project.
 - /project-showcase/ngawur -> "Project not found" tanpa error console.
 - Network Offline lalu buka detail -> state error + "Try again"; Slow 3G -> state loading.
 - Klik nama kontributor -> /contact?member=<id> (sebelum Contact jadi, halaman placeholder tetap terbuka tanpa error).
 - Menu "Projects Showcase" di navbar tetap aktif di halaman detail. Breadcrumb dan semua link bekerja.
 - 375px dan 1280px: tanpa overflow horizontal, galeri rapi, logo navbar sejajar dengan konten.
 - npm run build lolos; tanpa console error.
Commit hanya file tugas ini, lalu buat Pull Request ke main.
```

## Peta file

| Referensi (`pUI_kelompok4/kelompok4-team-portfolio`) | Repo kelompok (`Kelompok4_TubesPUIL2301`) | Tindakan |
|---|---|---|
| `src/views/ProjectDetail.vue` | `src/views/ProjectDetail.vue` (kosong) | Salin + adaptasi (store, breadcrumb, galeri, kontributor ke Contact) |
| `src/assets/project-detail.css` | `src/assets/project-detail.css` (kosong) | Salin + style dasar yang dibutuhkan (awalan `detail-`) |
| - | `src/assets/main.css` | Aktifkan hanya `@import './project-detail.css'` |
| - | `src/router/index.js` | Tambah route `project-detail` |
| - | `src/components/home/ProjectHighlight.vue` | Ubah tujuan tombol ke halaman detail (1 baris) |
| - | `public/images/projects/<id>/` | Taruh screenshot proyek |

## Alur navigasi yang harus berhasil

```
Home (Projects Highlight) --"View Detail Project"--> /project-showcase/<id>
/project (Showcase)       --"View Detail Project"--> /project-showcase/<id>
/project-showcase/<id>    --"Back to projects"-----> kembali ke /project (filter tetap)
/project-showcase/<id>    --klik nama kontributor--> /contact?member=<id>
```

## Hal yang perlu diperhatikan

- **Referensi tidak punya dokumentasi visual**, padahal FR-05 mensyaratkannya. Bagian galeri harus dibuat baru.
- Kontributor dipakai sebagai jalur ke Contact, sama seperti tombol "Contact ..." di kartu About.
- Id anggota: REFA=1, NIKEN=2, ALIFFIA=3, NADYA=4, ALVIA=5, DIVA=6.
