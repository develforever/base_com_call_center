import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export enum RouteNames {
  Home = 'home',
  Tickets = 'tickets',
  Login = 'login',
  Logout = 'logout',
  Ticket = 'ticket',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.Home,
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/tickets',
      name: RouteNames.Tickets,
      component: () => import('@/views/TicketsView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: RouteNames.Login,
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/logout',
      name: RouteNames.Logout,
      component: () => import('@/views/LogoutView.vue'),
    },
    {
      path: '/ticket/:id',
      name: RouteNames.Ticket,
      component: () => import('@/views/TicketView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

export default router
