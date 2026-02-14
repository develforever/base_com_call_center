<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import {
  useTicketsStore,
  TicketStatus,
  TicketPriority,
  type Ticket,
  statusLabels,
  priorityLabels,
} from '@/stores/useTicketsStore'
import { onMounted, ref } from 'vue'
import { Button, IconField, InputIcon, InputText, Select } from 'primevue'
import { FilterMatchMode } from '@primevue/core/api'
import { useRoute, useRouter } from 'vue-router'
import { RouteNames } from '@/router'

const store = useTicketsStore()

const getStatusSeverity = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.OPEN:
      return 'danger'
    case TicketStatus.PENDING:
      return 'warn'
    case TicketStatus.CLOSED:
      return 'success'
    default:
      return 'info'
  }
}

const getPrioritySeverity = (priority: TicketPriority) => {
  switch (priority) {
    case TicketPriority.LOW:
      return 'success'
    case TicketPriority.MEDIUM:
      return 'warn'
    case TicketPriority.HIGH:
      return 'danger'
    default:
      return 'info'
  }
}

const router = useRouter()
const route = useRoute()

const viewTicket = (ticket: Ticket) => {
  router.push({ name: RouteNames.Ticket, params: { id: ticket.id } })
}

const statuses = ref(
  (Object.keys(statusLabels) as Array<keyof typeof statusLabels>).map((key) => ({
    label: statusLabels[key],
    value: key,
  })),
)

const priorities = ref(
  (Object.keys(priorityLabels) as Array<keyof typeof priorityLabels>).map((key) => ({
    label: priorityLabels[key],
    value: key,
  })),
)

const filters = ref({
  global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
  assignedTo: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null as string | null, matchMode: FilterMatchMode.EQUALS },
  priority: { value: null as string | null, matchMode: FilterMatchMode.EQUALS },
})

const onRowClick = (event: { data: Ticket }) => {
  const id = event.data.id

  router.push({ name: RouteNames.Ticket, params: { id } })
}

onMounted(() => {
  store.fetchTickets()
  if (route.query.status) {
    filters.value.status.value = route.query.status as string
  }
  if (route.query.priority) {
    filters.value.priority.value = route.query.priority as string
  }
})

const getStatusLabel = (status: TicketStatus): string => {
  return statusLabels[status]
}
const getPriorityLabel = (priority: TicketPriority): string => {
  return priorityLabels[priority]
}
</script>

<template>
  <main>
    <DataTable :value="store.tickets" v-model:filters="filters" :globalFilterFields="['id', 'customer.name', 'title']"
      :loading="store.isLoading" dataKey="id" filterDisplay="row" paginator :rows="10" sortMode="single"
      :sortField="'priorityValue'" :sortOrder="-1" @row-click="onRowClick" rowHover class="cursor-pointer-table"
      responsiveLayout="stack">
      <template #empty> No tickets found. </template>
      <template #header>
        <div class="flex justify-between items-center gap-4">
          <h2 class="text-xl font-bold m-0">Zgłoszenia</h2>

          <IconField iconPosition="left">
            <InputIcon class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Szukaj (ID, klient, temat...)"
              class="w-full md:w-80" />
          </IconField>
        </div>
      </template>

      <Column field="id" header="ID" sortable></Column>
      <Column field="customer.name" header="Klient">
        <template #body="{ data }">
          <div>{{ data.customer.name }}</div>
          <div>
            E-mail: <small class="text-gray-500">{{ data.customer.email }}</small>
          </div>
          <div>
            Telefon: <small class="text-gray-500">{{ data.customer.phone }}</small>
          </div>
        </template>
      </Column>
      <Column field="title" header="Temat">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag :value="getStatusLabel(slotProps.data.status as TicketStatus)"
            :severity="getStatusSeverity(slotProps.data.status as TicketStatus)" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" optionLabel="label"
            optionValue="value" placeholder="Wybierz status" showClear>
            <template #option="slotProps">
              <Tag :value="slotProps.option.label"
                :severity="getStatusSeverity(slotProps.option.value as TicketStatus)" />
            </template>
          </Select>
        </template>
      </Column>

      <Column field="priority" header="Priorytet" :sortField="'priorityValue'" sortable>
        <template #body="{ data }">
          <Tag :value="getPriorityLabel(data.priority as TicketPriority)"
            :severity="getPrioritySeverity(data.priority as TicketPriority)" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select v-model="filterModel.value" @change="filterCallback()" :options="priorities" optionLabel="label"
            optionValue="value" placeholder="Wybierz priorytet" showClear>
            <template #option="slotProps">
              <Tag :value="slotProps.option.label"
                :severity="getPrioritySeverity(slotProps.option.value as TicketPriority)" />
            </template>
          </Select>
        </template>
      </Column>
      <Column field="assignedTo" header="Przypisany do">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
        </template>
      </Column>
      <Column header="Akcje" style="min-width: 12rem">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button icon="pi pi-file-edit" severity="info" outlined @click="viewTicket(slotProps.data)">
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </main>
</template>

<style lang="scss">
.p-datatable-column-title {
  color: $green-light;
}

.cursor-pointer-table {
  :deep(.p-datatable-tbody > tr) {
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--p-primary-50);
    }
  }
}
</style>
