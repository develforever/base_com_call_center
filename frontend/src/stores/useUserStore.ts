import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ROLE = 'ADMIN' | 'USER';

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: ROLE
  permissions: string[]
}

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([
    {
      id: 1,
      name: 'Patrycja Nowak',
      email: 'patrycja@base.com',
      password: 'password',
      role: 'ADMIN',
      permissions: ['ALL'],
    },
  ])

  const isLoggedIn = ref(false)
  const loggedUser = ref<User | null>(null)

  function login(username: string, password: string): boolean {
    const foundUser = users.value.find((u) => u.email === username && u.password === password)

    if (foundUser) {
      isLoggedIn.value = true
      loggedUser.value = foundUser
      return true
    }
    return false
  }

  function logout() {
    loggedUser.value = null
    isLoggedIn.value = false
  }

  // loggedUser.value = users.value[0]
  // isLoggedIn.value = true

  return { users, isLoggedIn, loggedUser, login, logout }
})
