<template>
  <nav class="sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Menubar :model="items" class="border-none bg-transparent py-3">
        <template #start>
          <div class="flex items-center gap-2 mr-8">
            <div
              class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-200"
            >
              <i class="pi pi-bolt text-white text-xl"></i>
            </div>
            <span class="text-xl font-black tracking-tight">{{ title }}</span>
          </div>
        </template>

        <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a
              :href="href"
              v-bind="props.action"
              @click="navigate"
              class="flex items-center gap-2 group"
            >
              <span
                :class="[
                  item.icon,
                  'text-slate-400 group-hover:text-primary-600 transition-colors',
                ]"
              />
              <span class="font-medium text-slate-100 group-hover:text-slate-400">{{
                item.label
              }}</span>
            </a>
          </router-link>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
            class="flex items-center gap-2"
          >
            <span :class="item.icon" />
            <span class="font-medium">{{ item.label }}</span>
            <i v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
          </a>
        </template>

        <template #end>
          <div class="flex items-center gap-3">
            <Button
              label="Zaloguj"
              @click="login"
              v-if="!userStore.isLoggedIn && router.currentRoute.value.path !== '/login'"
              outlined
              size="small"
              class="hidden sm:flex border-slate-300 text-slate-700"
            />
            <Button
              label="Wyloguj"
              @click="logout"
              v-if="userStore.isLoggedIn"
              outlined
              size="small"
              class="hidden sm:flex border-slate-300 text-slate-700"
            />

            <Avatar
              v-if="userStore.isLoggedIn"
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
              class="ml-2 border-2 border-primary-100"
            />
          </div>
        </template>
      </Menubar>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Menubar from 'primevue/menubar'

import { useUserStore } from '@/stores/useUserStore'
import { Avatar, Button } from 'primevue'
import { useRouter } from 'vue-router'
import { RouteNames } from '@/router'

interface Props {
  title?: string
}

const router = useRouter()

withDefaults(defineProps<Props>(), {
  title: 'Call Center',
})

const userStore = useUserStore()

const items = computed(() => [
  {
    label: 'Strona główna',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'Zgłoszenia',
    icon: 'pi pi-folder',
    route: '/tickets',
    visible: userStore.isLoggedIn,
  },
])

const login = () => {
  router.push({ name: RouteNames.Login })
}

const logout = () => {
  userStore.logout()
  router.push({ name: RouteNames.Login })
}
</script>

<style scoped>
@reference "tailwindcss";

:deep(.p-menubar) {
  padding: 0;
}

:deep(.p-menubar-button) {
  @apply hover:bg-slate-100 rounded-lg;
}
</style>
