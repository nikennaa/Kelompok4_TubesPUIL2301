import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

// Semua link di aplikasi memakai NAMA route (bukan path),
// jadi kalau URL ingin diganti cukup ubah di file ini.
//
// Issue ini baru mengerjakan Layout + Navbar + Footer + Home (Team Identity).
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
        { path: 'about', name: 'about', component: ComingSoon, meta: { title: 'About Team' } },
        { path: 'project', name: 'projects', component: ComingSoon, meta: { title: 'Projects Showcase' } },
        { path: 'contact', name: 'contact', component: ComingSoon, meta: { title: 'Contact' } },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
})

export default router
