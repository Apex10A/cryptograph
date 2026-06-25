import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/marketing/Landing.vue'
import Features from '../views/marketing/Features.vue'
import About from '../views/marketing/About.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: { title: 'CryptoFlow — Live Crypto Terminal' },
    },
    {
      path: '/features',
      name: 'features',
      component: Features,
      meta: { title: 'Features — CryptoFlow' },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { title: 'About — CryptoFlow' },
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: Dashboard,
      meta: { title: 'Terminal — CryptoFlow' },
    },
    {
      path: '/dashboard',
      redirect: '/terminal',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      meta: { title: 'Not Found — CryptoFlow' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || 'CryptoFlow'
  document.title = title
})

export default router
