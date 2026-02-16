<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/stores/useUserStore'
import router from '@/router'

const toast = useToast()

toast.add({
  severity: 'success',
  summary: 'You have been logged out.',
  life: 3000,
})

const { logout } = useUserStore()
logout()

router.push('/')
</script>

<template>
  <div />
</template>
