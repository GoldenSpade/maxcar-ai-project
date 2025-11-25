import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { title: 'Ласкаво просимо!' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  const defaultTitle = 'Vue App title'
  document.title = to.meta.title || defaultTitle
})

export default router
