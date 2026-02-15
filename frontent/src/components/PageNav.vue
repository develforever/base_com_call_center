<template>
  <nav class="pagenav">
    <Button
      class="pagenav__item pagenav__item--highlighted"
      label="Powrót do listy"
      @click="router.back()"
    />
  </nav>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss">
@use '@/assets/globals' as *;

.pagenav {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  &__item {
    padding: 0.2rem 0.6rem;

    &--highlighted {
      background-color: var(--p-button-primary-background);
      color: $green-darker;
    }
  }
}
</style>
