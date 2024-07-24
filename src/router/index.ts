import { createRouter, createWebHistory } from 'vue-router'
import HotelView from '../views/HotelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HotelView
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue')
    }
  ]
})

export default router
