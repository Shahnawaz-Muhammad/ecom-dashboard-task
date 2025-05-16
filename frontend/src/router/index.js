import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import InventoryView from '@/views/InventoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard  ',
    },
    {
      path: '/dashboard',
      name: 'dashboard  ',
      component: DashboardView,
    },
    {
      path: '/inventory',
      name: 'inventory  ',
      component: InventoryView,
    },
  ],
})

export default router
