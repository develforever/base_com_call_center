<script setup lang="ts">
import { useTicketsStore } from '@/features/tickets/stores/useTicketsStore'
import { Card } from 'primevue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'

const ticketsStore = useTicketsStore()

onMounted(() => {
  ticketsStore.fetchTickets()
})
</script>

<template>
  <div class="homeboard min-h-[80vh] flex items-center justify-center p-4">
    <div class="w-full max-w-4xl">
      <h2
        class="homeboard__title text-center text-slate-500 uppercase tracking-widest text-sm font-bold mb-8"
      >
        Status Systemu
      </h2>

      <div class="grid grid-cols-1 gap-6" :class="{ 'md:grid-cols-3': !ticketsStore.isLoading }">
        <ProgressSpinner
          class="homeboard__loader"
          v-if="ticketsStore.isLoading"
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
        />

        <Card
          v-if="!ticketsStore.isLoading"
          class="homeboard__status-item overflow-hidden border-t-4 border-blue-500 shadow-lg"
        >
          <template #content>
            <div class="flex flex-col items-center py-4">
              <i class="pi pi-inbox text-blue-500 text-3xl mb-3"></i>

              <RouterLink :to="{ name: 'tickets' }">
                <span class="text-4xl font-black text-slate-800">{{
                  ticketsStore.filteredTickets.length
                }}</span>
              </RouterLink>

              <span class="text-slate-500 font-medium mt-2">Zgłoszeń</span>
            </div>
          </template>
        </Card>

        <Card
          v-if="!ticketsStore.isLoading"
          class="homeboard__status-item overflow-hidden border-t-4 border-green-500 shadow-lg"
        >
          <template #content>
            <div class="flex flex-col items-center py-4">
              <i class="pi pi-sparkles text-green-500 text-3xl mb-3"></i>

              <RouterLink :to="{ name: 'tickets', query: { status: 'new' } }">
                <span class="text-4xl font-black text-slate-800">{{
                  ticketsStore.newTickets.length
                }}</span>
              </RouterLink>

              <span class="text-slate-500 font-medium mt-2">Nowe zgłoszenia</span>
            </div>
          </template>
        </Card>

        <Card
          v-if="!ticketsStore.isLoading"
          class="homeboard__status-item overflow-hidden border-t-4 border-red-500 shadow-lg scale-105"
        >
          <template #content>
            <div class="flex flex-col items-center py-4">
              <i class="pi pi-exclamation-triangle text-red-500 text-3xl mb-3 animate-pulse"></i>

              <RouterLink
                class="homeboard__status-item__link"
                :to="{ name: 'tickets', query: { priority: 'high' } }"
              >
                <span class="text-4xl font-black text-slate-800">{{
                  ticketsStore.highPriorityTickets.length
                }}</span>
              </RouterLink>

              <span class="font-medium mt-2 text-red-600">Pilne zgłoszenia</span>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
