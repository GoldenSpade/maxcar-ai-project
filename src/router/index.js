import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Admin from '@/pages/Admin.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { title: 'MaxCar - AI Помощник по подбору автомобилей' },
  },
  {
    path: '/admin',
    component: Admin,
    name: 'admin',
    meta: { title: 'Админ-панель - MaxCar' },
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
