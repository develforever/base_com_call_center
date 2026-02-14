<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <Toast />
  <header>
    <NavBar />
  </header>
  <main class="flex flex-col gap-2 mt-2 mb-2 ms-2 me-2">
    <RouterView />
  </main>
  <AppFooter />
</template>
