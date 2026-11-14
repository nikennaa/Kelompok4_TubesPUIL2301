# Brief: mengerjakan halaman /contact

Dokumen ini untuk anggota yang mengerjakan halaman **Contact**. Bagian "Prompt untuk Claude"
di bawah boleh disalin langsung ke Claude Code (jalankan dari folder repo `Kelompok4_TubesPUIL2301`).

## Prompt untuk Claude

```text
Kerjakan halaman /contact di repo D:\KULIAH\SEM 7\UILANJUT\Kelompok4_TubesPUIL2301 (Vue 3 + Vite + Pinia + Vue Router).

ATURAN
- Semua perubahan ditulis di Kelompok4_TubesPUIL2301.
- D:\KULIAH\SEM 7\UILANJUT\pUI_kelompok4\kelompok4-team-portfolio hanya REFERENSI tampilan: baca saja, jangan diubah.
- Buat branch baru: feat/contact-page. Jangan menyentuh AboutTeam.vue, MemberCard.vue, Home, Navbar, Footer.
- Label tombol dan teks UI memakai bahasa Inggris. Tanpa library ikon (pakai src/components/ui/SocialIcon.vue).

LANGKAH 1 - Salin dari referensi ke repo kelompok
(a) pUI_kelompok4/.../src/views/Contact.vue  ->  src/views/Contact.vue (di repo kelompok masih file kosong).
    Sesuaikan:
    - Hapus import lucide-vue-next (repo kelompok tidak memakainya). Ganti ikon dengan <SocialIcon name="github|mail|linkedin" /> dan panah dengan teks "↗".
    - Jangan pakai SectionHeading global (di repo kelompok gayanya berbeda: rata tengah). Tulis heading sendiri
      seperti di src/views/AboutTeam.vue (class berawalan contact-, mis. contact-hero, contact-heading).
    - Data jangan dari ../data/members langsung, tapi dari store: useMembersStore() (src/stores/members.js).
      Pola pemakaiannya sama dengan AboutTeam.vue: storeToRefs + onMounted(() => status === 'idle' && store.fetchProfiles()).
      Dari store tersedia: name (dari GitHub), shortName, avatarUrl, githubUrl, email, linkedin, role, id.
(b) pUI_kelompok4/.../src/assets/contact.css  ->  src/assets/contact.css (di repo kelompok masih kosong).
    Lalu AKTIFKAN import-nya di src/assets/main.css: pindahkan baris `@import './contact.css';` keluar dari blok komentar.
    Catatan: contact.css referensi bergantung pada style yang TIDAK ada di repo kelompok. Salin juga ke contact.css
    (supaya halaman berdiri sendiri), dari referensi:
      - components.css: blok "Card dasar" untuk .contact-card (border, radius, background, transition, :hover),
        blok .avatar, dan aturan ".contact-card h3 / .contact-card p"
      - layout.css: .eyebrow, .page-hero, .page-hero h1, .page-hero > p, .section (+ versi mobile-nya)
    Beri awalan contact- pada class umum (page-hero -> contact-hero, section -> contact-section) agar tidak
    bentrok dengan halaman Project yang akan dikerjakan teman lain.
(c) Avatar: tampilkan foto GitHub (member.avatarUrl) bulat/rounded kecil; jika kosong atau gagal dimuat, tampilkan inisial
    (pola @error seperti di MemberCard.vue).
(d) Isi data kontak asli di src/data/members.js untuk tiap anggota (email, linkedin). Sekarang masih
    refa@example.com dan '#'. Tautan eksternal pakai target="_blank" rel="noopener". Tidak boleh ada href="#".

LANGKAH 2 - Router (kontrak dengan halaman About)
Di halaman /about, tombol "Contact Niken" mengarah ke  /contact?member=2  (angka = member.id dari data/members.js).
Halaman Contact WAJIB:
 1. Memberi setiap kartu anggota atribut id="member-<id>" (contoh id="member-2").
 2. Saat dibuka dengan ?member=<id>: menggulir halus ke kartu itu dan menyorotnya (mis. class contact-card--active:
    border pink + shadow). Cari dengan Number(route.query.member).
 3. Jika ?member kosong, bukan angka, atau id tidak ada: tidak error, halaman tampil normal dari atas.
 4. Tetap benar bila pengguna pindah dari ?member=2 ke ?member=3 saat sudah di halaman Contact
    (komponen dipakai ulang, jadi pantau perubahan route.query.member).
Di src/router/index.js:
 - Baris route 'contact' (sekarang component: ComingSoon, meta: { title: 'Contact' }) ganti menjadi
   component: () => import('../views/Contact.vue'). ComingSoon JANGAN dihapus karena route 'projects' masih memakainya.
 - Penggulirannya paling rapi lewat scrollBehavior router (sekarang selalu () => ({ top: 0 }), yang akan
   menimpa scrollIntoView buatan sendiri). Ubah menjadi:
       scrollBehavior(to) {
         const id = Number(to.query.member)
         if (to.name === 'contact' && Number.isInteger(id)) {
           return { el: `#member-${id}`, behavior: 'smooth', top: 24 }
         }
         return { top: 0 }
       }
   Pastikan id yang tidak ada tidak menimbulkan error/peringatan (cek elemen ada sebelum mengembalikan el, atau jatuh ke { top: 0 }).
   Jika cara ini tidak berhasil, alternatifnya: onMounted + watch di Contact.vue memakai nextTick lalu
   document.getElementById(`member-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
   dan scrollBehavior untuk route contact dengan query member dikembalikan false.

LANGKAH 3 - Uji sebelum PR
 - npm run dev. Dari /about klik "Contact Niken" -> URL /contact?member=2, halaman menggulir dan kartu Niken tersorot.
 - Ulangi untuk Refa, Aliffia, Nadya, Alvia, Diva (id 1,3,4,5,6).
 - Buka langsung /contact, /contact?member=99, /contact?member=abc -> tampil normal tanpa error di console.
 - Layar 375px dan 1280px: tidak ada overflow horizontal, teks panjang tidak keluar kartu (overflow-wrap).
 - Tautan GitHub, email, LinkedIn tiap anggota terbuka ke tujuan yang benar.
 - Matikan jaringan: halaman tetap tampil (avatar inisial), bukan kosong.
 - npm run build harus lolos tanpa error.
Setelah itu commit di feat/contact-page dan buat Pull Request ke main.
```

## Peta file (ringkas)

| Referensi (`pUI_kelompok4/kelompok4-team-portfolio`) | Repo kelompok (`Kelompok4_TubesPUIL2301`) | Tindakan |
|---|---|---|
| `src/views/Contact.vue` | `src/views/Contact.vue` (kosong) | Salin, lalu sesuaikan (tanpa lucide, pakai store, heading sendiri) |
| `src/assets/contact.css` | `src/assets/contact.css` (kosong) | Salin + tambahkan style dasar yang dibutuhkan |
| `src/assets/components.css` (`.contact-card`, `.avatar`) | masuk ke `contact.css` | Salin bagian yang relevan |
| `src/assets/layout.css` (`.page-hero`, `.eyebrow`, `.section`) | masuk ke `contact.css` | Salin, ganti awalan `contact-` |
| - | `src/assets/main.css` | Aktifkan `@import './contact.css'` |
| - | `src/router/index.js` | Route `contact` pindah ke `Contact.vue` + `scrollBehavior` |
| - | `src/data/members.js` | Isi email dan LinkedIn asli |

## Alur navigasi yang harus berhasil

```
/about  --klik "Contact Niken"-->  /contact?member=2
                                      |-- kartu id="member-2" digulir ke tengah layar
                                      '-- kartu disorot (border pink + shadow)
```

- Tombol dibuat di `src/components/team/MemberCard.vue` memakai `AppButton` dengan
  `:to="{ name: 'contact', query: { member: member.id } }"`. File itu **tidak perlu diubah**.
- Nilai `id` anggota: REFA=1, NIKEN=2, ALIFFIA=3, NADYA=4, ALVIA=5, DIVA=6.
