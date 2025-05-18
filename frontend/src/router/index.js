import { createRouter, createWebHistory } from 'vue-router'
import RevenueAnalysis from '@/views/RevenueAnalysisView.vue'
import InventoryManagement from '@/views/InventoryManagementView.vue'
import AddProductView from '@/views/AddProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/revenue-analysis',
    },
    {
      path: '/revenue-analysis',
      name: 'Revenue Analysis  ',
      component: RevenueAnalysis,
    },
    {
      path: '/inventory-management',
      name: 'inventory-management  ',
      component: InventoryManagement,
    },
    { path: '/register-product', 
      name: 'Register Product', 
      component: AddProductView 
    },
  ],
})

export default router
