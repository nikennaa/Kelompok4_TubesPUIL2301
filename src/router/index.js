
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const ComingSoon = () => import('../views/ComingSoon.vue')

const router = createRouter({
  history: createWebHistory(),

  scrollBehavior(to) {
    const id = Number(to.query.member)

    if (to.name === 'contact' && Number.isInteger(id) && id > 0) {
      const memberElement = document.getElementById(`member-${id}`)

      if (memberElement) {
        return {
          el: `#member-${id}`,
          behavior: 'smooth',
          top: 24,
        }
      }

      return false
    }

    return { top: 0 }
  },

  routes: [
    { path: '/', redirect: '/home' },

    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutTeam.vue'),
        },
        {
          path: 'project',
          name: 'projects',
          component: ComingSoon,
          meta: { title: 'Projects Showcase' },
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('../views/Contact.vue'),
          meta: { title: 'Contact' },
        },
      ],
    },

    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
})

export default router
