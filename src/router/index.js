import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

// Semua link di aplikasi memakai NAMA route (bukan path),
// jadi kalau URL ingin diganti cukup ubah di file ini.
//
// Yang sudah jadi: Layout + Navbar + Footer + Home + About Team (GitHub REST API).
// Halaman lain sementara memakai ComingSoon; saat halaman aslinya jadi,
// ganti `ComingSoon` dengan view-nya, mis.:
//   component: () => import('../views/AboutTeam.vue')
const ComingSoon = () => import('../views/ComingSoon.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'home', name: 'home', component: () => import('../views/Home.vue') },
        { path: 'about', name: 'about', component: () => import('../views/AboutTeam.vue') },
        { path: 'project', name: 'projects', component: ComingSoon, meta: { title: 'Projects Showcase' } },
        // Contact: dibuka dari tombol "Contact <nama>" di kartu anggota dengan /contact?member=<id>.
        // Saat halaman aslinya dibuat: baca `route.query.member`, lalu gulir ke kartu anggota itu
        // (mis. elemen id="member-2" + scrollIntoView) dan sorot kartunya.
        { path: 'contact', name: 'contact', component: ComingSoon, meta: { title: 'Contact' } },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
})

export default router
