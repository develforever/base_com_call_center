<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FilterMatchMode } from '@primevue/core/api'
import { useTicketsStore, statusLabels, priorityLabels } from '@/stores/useTicketsStore'
import { TicketPriority, TicketStatus } from '@/types/types'
import type { Ticket } from '@/types/types'

import { DataTable, Column, Tag, Button, IconField, InputIcon, InputText, Select } from 'primevue'
import { RouteNames } from '@/router'

const STATUS_SEVERITY: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'danger',
  [TicketStatus.PENDING]: 'warn',
  [TicketStatus.CLOSED]: 'success',
  [TicketStatus.NEW]: 'info',
  [TicketStatus.ON_HOLD]: 'secondary',
  [TicketStatus.CANCELLED]: 'secondary',
}

const PRIORITY_SEVERITY: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: 'success',
  [TicketPriority.MEDIUM]: 'warn',
  [TicketPriority.HIGH]: 'danger',
}

const store = useTicketsStore()
const router = useRouter()
const route = useRoute()

const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({ label, value }))
const priorityOptions = Object.entries(priorityLabels).map(([value, label]) => ({ label, value }))

const filters = ref({
  global: { value: (route.query.search as string) || null, matchMode: FilterMatchMode.CONTAINS },
  status: {
    value: (route.query.status as TicketStatus) || null,
    matchMode: FilterMatchMode.EQUALS,
  },
  priority: {
    value: (route.query.priority as TicketPriority) || null,
    matchMode: FilterMatchMode.EQUALS,
  },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  assignedTo: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

watch(
  filters,
  (newFilters) => {
    const query = {
      ...route.query,
      status: newFilters.status.value || undefined,
      priority: newFilters.priority.value || undefined,
      search: newFilters.global.value || undefined,
    }
    router.replace({ query })
  },
  { deep: true },
)

onMounted(() => store.fetchTickets())

const navigateToTicket = (id: number) => {
  router.push({ name: RouteNames.Ticket, params: { id } })
}
</script>

<template>
  <main class="p-4">
    <DataTable
      :value="store.tickets"
      v-model:filters="filters"
      :loading="store.isLoading"
      dataKey="id"
      filterDisplay="row"
      paginator
      :rows="10"
      @row-click="(e) => navigateToTicket(e.data.id)"
      rowHover
      class="border rounded-lg overflow-hidden shadow-sm"
    >
      <template #header>
        <div class="flex flex-wrap justify-between items-center gap-4 py-2">
          <h1 class="text-2xl font-bold tracking-tight">System Zgłoszeń</h1>
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="filters.global.value"
              placeholder="Szukaj globalnie..."
              class="w-full md:w-80"
            />
          </IconField>
        </div>
      </template>

      <Column field="id" header="ID" sortable class="font-mono w-20" />

      <Column field="customer.name" header="Klient" sortable>
        <template #body="{ data }: { data: Ticket }">
          <div class="flex flex-col">
            <span class="font-medium text-white-900">{{ data.customer.name }}</span>
            <span class="text-xs text-white-500">{{ data.customer.email }}</span>
          </div>
        </template>
      </Column>

      <Column field="title" header="Temat">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by name"
          />
        </template>
      </Column>

      <Column field="status" header="Status" :showFilterMenu="false">
        <template #body="{ data }: { data: Ticket }">
          <Tag :value="statusLabels[data.status]" :severity="STATUS_SEVERITY[data.status]" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Wszystkie"
            class="p-column-filter"
            showClear
          />
        </template>
      </Column>

      <Column field="priority" header="Priorytet" sortable>
        <template #body="{ data }: { data: Ticket }">
          <Tag
            :value="priorityLabels[data.priority]"
            :severity="PRIORITY_SEVERITY[data.priority]"
          />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="priorityOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Wszystkie"
            class="p-column-filter"
            showClear
          />
        </template>
      </Column>

      <Column field="assignedTo" header="Agent" sortable />

      <Column header="Akcje" class="w-24">
        <template #body="{ data }">
          <Button icon="pi pi-chevron-right" text rounded @click.stop="navigateToTicket(data.id)" />
        </template>
      </Column>
    </DataTable>
  </main>
</template>

<style scoped>
:deep(.p-datatable-tbody > tr) {
  cursor: pointer;
  transition: all 0.2s;
}
</style>
