<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/stores/useUserStore'
import router, { RouteNames } from '@/router'

const toast = useToast()

toast.add({
  severity: 'success',
  summary: 'You have been logged out.',
  life: 3000,
})

const userStore = useUserStore()
userStore.logout()

router.push({ name: RouteNames.Login })
</script>

<template>
  <div />
</template>
