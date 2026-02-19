import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { features } from '@/features/features'

export enum RouteNames {
  Home = 'home',
  Login = 'login',
  Logout = 'logout',
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: RouteNames.Home,
        component: HomeView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'login',
        name: RouteNames.Login,
        component: () => import('@/views/LoginView.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'logout',
        name: RouteNames.Logout,
        component: () => import('@/views/LogoutView.vue'),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
]

features.forEach((feature) => {
  routes[0]?.children?.push(...feature.routes)
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
