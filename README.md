# Kelompok 4 — Web Portofolio Tim

## Project brief
- Users: masyarakat umum, calon pemberi kerja, klien, atau dosen yang ingin mengenal tim.
- Kebutuhan: memahami kompetensi anggota dan melihat bukti karya.
- Goal: membantu pengunjung mengenali tim dan karya yang relevan.
- Indikator: semua anggota memiliki profil; setiap proyek menjelaskan kontribusi anggota; kontak anggota mudah ditemukan dan dapat dibuka.
- Luaran: website Vue.js berisi landing page, profil tim/anggota, showcase proyek, detail proyek, dan kontak; layout responsif; data terhubung ke API.
- Scope: landing page, about team, project showcase, project detail, contact. Di luar scope: transaksi, login/autentikasi, dan dashboard admin.
- Ketentuan tugas besar: tetap mengikuti instruksi dosen (min. 3 proyek anggota, reusable components, state management, min. 1 API relevan, test case dan hasil pengujian, Git/GitHub, Jira).

## Teknologi
- Vue.js, Vue Router, Pinia (state management)
- **GitHub REST API** untuk halaman About Team (profil, avatar, bio, repo anggota)
- Git/GitHub (kolaborasi, branch, PR) dan Jira (dokumentasi kerja tim)

## Tanggung jawab
- Alvia: arah produk/konten; struktur data dan konten awal.
- Niken: koordinasi/integrasi; setup, routing, dan integrasi API.
- Refa: konsistensi UI; layout dan navigation.
- Aliffia: Project Showcase dan Project Detail; komponen kartu proyek.
- Nadya: About Team dan Contact; kartu anggota.
- Diva: pemeriksaan hasil; test case dan pengujian alur.

## Requirements

### Functional Requirements
| ID | Kebutuhan | Kriteria penerimaan |
| --- | --- | --- |
| FR-01 | Pengunjung dapat melihat landing page utama | Identitas tim, ringkasan, nilai/fokus tim, dan highlight proyek pilihan tampil; tombol menuju Showcase dan About Team dapat dibuka. |
| FR-02 | Pengunjung dapat mencari dan memfilter proyek berdasarkan anggota | Hasil daftar proyek berubah sesuai kata kunci atau anggota yang dipilih; muncul empty state jika tidak ada hasil. |
| FR-03 | Pengunjung dapat melihat halaman About Team | Foto/avatar, nama, peran, keahlian, dan informasi singkat seluruh anggota tampil dengan data dari GitHub REST API. |
| FR-04 | Pengunjung dapat melihat halaman Project Showcase | Kartu proyek menampilkan judul, ringkasan, kategori, dan teknologi; minimal 3 proyek anggota tampil. |
| FR-05 | Pengunjung dapat melihat Project Detail | Latar belakang, tujuan, fitur, teknologi, dokumentasi visual, dan kontribusi anggota tersedia; detail terbuka dari kartu proyek. |
| FR-06 | Pengunjung dapat menghubungi setiap anggota melalui Contact | Tautan GitHub, Email, dan LinkedIn setiap anggota dapat dibuka dan menuju tujuan yang benar. |

### Non-Functional Requirements
| ID | Kebutuhan | Kriteria penerimaan |
| --- | --- | --- |
| NFR-01 | Layout responsif | Pada lebar 375 px dan 1280 px, konten utama tidak terpotong dan tidak ada overflow horizontal yang tidak disengaja. |
| NFR-02 | Kemudahan navigasi | Menu aktif ter-highlight; semua halaman utama dapat dijangkau dari navbar; halaman detail memiliki cara kembali (mis. breadcrumb). |
| NFR-03 | UI konsisten | Warna, tombol, kartu, dan komponen sejenis mengikuti gaya/perilaku yang disepakati kelompok. |
| NFR-04 | Penanganan kondisi data (API) | Halaman berbasis API menampilkan loading, error (dengan tombol coba lagi), empty, dan success state dengan jelas. |

Ukuran layar di atas hanya contoh; sepakati ukuran pemeriksaan kelompok.
Setiap anggota meninjau requirements dan memperbaruinya bila perlu.

## Milestone
| ID | Capaian |
| --- | --- |
| M1 | Struktur proyek siap: repo, Github Project, wireframe, struktur Vue, router, layout, dan komponen dasar (Navbar, Button, Card) sudah jadi. |
| M2 | Halaman About Team terhubung ke API (GitHub REST API). |
| M3 | Fitur utama terintegrasi: search/filter, Project Detail, dan penanganan 4 kondisi UI (loading, error, empty, success) berjalan. |
| M4 | Testing selesai dilakukan. |

## Rencana awal
1 sprint = 1 minggu.
- Sprint 1, minggu 9: struktur utama dan landing page dapat digunakan (M1).
- Sprint 2, minggu 10: profil anggota dan daftar proyek terhubung API (M2).
- Sprint 3, minggu 11: search/filter, detail proyek, dan 4 kondisi UI (M3).
- Sprint 4, minggu 12: kontak, testing/evaluasi, perbaikan, persiapan presentasi (M4).

## Sprint goal
| Sprint | Sprint goal | Cakupan |
| --- | --- | --- |
| 1 | Pengunjung dapat membuka landing page dan berpindah antarhalaman lewat navbar yang konsisten di desktop maupun mobile. | FR-01, NFR-01, NFR-02, NFR-03 |
| 2 | Pengunjung dapat melihat profil seluruh anggota dan daftar proyek yang datanya diambil dari API. | FR-03, FR-04 |
| 3 | Pengunjung dapat mencari proyek berdasarkan anggota dan membuka detail proyek, dengan tampilan loading, error, dan empty yang jelas. | FR-02, FR-05, NFR-04 |
| 4 | Pengunjung dapat menghubungi setiap anggota, dan website lolos pengujian di berbagai ukuran layar. | FR-06, semua NFR |

## Sprint goal pertama
Pengunjung dapat membuka landing page dan berpindah ke halaman utama lain melalui navbar yang konsisten di desktop maupun mobile.

## Koordinasi
- Check-in: Kamis 10:30, Discord/Onsite
- Review, retrospective, planning: [tanggal/jam/tautan kalender].
- Catatan dan update mingguan: Status updates pada Project.
- GitHub Project: https://github.com/users/nikennaa/projects/1 