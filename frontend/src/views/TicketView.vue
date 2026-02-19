<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ConfirmPopup, useConfirm, useToast } from 'primevue'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { statusLabels, priorityLabels } from '@/composables/useTicketFormatter'

import { Button, Card, InputText, Message, Select, Textarea } from 'primevue'
import PageNav from '@/components/PageNav.vue'
import type { Ticket, TicketUpdateParams } from '@/api/services/tickets.service'

const STATUS_OPTIONS = Object.entries(statusLabels).map(([value, label]) => ({ label, value }))
const PRIORITY_OPTIONS = Object.entries(priorityLabels).map(([value, label]) => ({ label, value }))

const confirm = useConfirm();
const toast = useToast()
const router = useRouter()
const route = useRoute()
const store = useTicketsStore()

const ticketId = Number(route.params.id)
const isSaving = ref(false)

const ticketDraft = ref<Ticket | null>(null)
const ticketUpdate = ref<TicketUpdateParams>({})

watch(
  () => store.ticket,
  (newTicket) => {
    if (newTicket) {
      ticketDraft.value = { ...JSON.parse(JSON.stringify(newTicket)), ...ticketUpdate.value }
    }
  },
  { immediate: true },
)

onMounted(async () => {
  if (isNaN(ticketId)) {
    toast.add({ severity: 'error', summary: 'Błąd', detail: 'Nieprawidłowe ID' })
    return
  }
  await store.fetchTicket(ticketId)
})

onUnmounted(() => {
  store.resetTicket()
})

const handleSave = async () => {
  if (!ticketDraft.value) {
    toast.add({ severity: 'error', summary: 'Błąd', detail: 'Nieprawidłowe dane' })
    return
  }

  isSaving.value = true
  try {
    const success = await store.updateTicket(ticketId, ticketUpdate.value)
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Zapisano',
        detail: 'Zmiany zostały zapisane',
        life: 3000,
      })
      router.back()
    } else {
      toast.add({ severity: 'error', summary: 'Błąd', detail: 'Nie udało się zapisać zmian' })
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Błąd zapisu', detail: 'Spróbuj ponownie później' })
    console.error(error)
  } finally {
    isSaving.value = false
  }
}

const handleDelete = async () => {
  if (!ticketDraft.value) {
    toast.add({ severity: 'error', summary: 'Błąd', detail: 'Nieprawidłowe dane' })
    return
  }

  isSaving.value = true
  try {
    const success = await store.deleteTicket(ticketId)
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Usunięto',
        detail: 'Zgłoszenie zostało usunięte',
        life: 3000,
      })
      router.back()
    } else {
      toast.add({ severity: 'error', summary: 'Błąd', detail: 'Nie udało się usunąć zgłoszenia' })
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Błąd usuwania', detail: 'Spróbuj ponownie później' })
    console.error(error)
  } finally {
    isSaving.value = false
  }
}

const formatDate = (date: string) => new Date(date).toLocaleString()

const updateField = (field: keyof TicketUpdateParams, value: any) => {
  ticketUpdate.value[field] = value
}

const requireConfirmation = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Czy na pewno chcesz usunąć to zgłoszenie?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Anuluj',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Usuń',
      severity: 'danger'
    },
    accept: () => {
      handleDelete();
    },
    reject: () => {
      // Opcjonalnie: co się dzieje po kliknięciu "Anuluj"
    }
  });
};

</script>

<template>
  <main class="p-4">
    <PageNav />
    <ConfirmPopup></ConfirmPopup>

    <div v-if="ticketDraft" class="max-w-4xl mx-auto mt-4">
      <Card shadow-lg>
        <template #title>Zgłoszenie #{{ ticketDraft.id }}</template>

        <template #subtitle>
          <div class="flex flex-wrap gap-2 text-sm">
            <span>Klient: <strong>{{ ticketDraft.customer.name }}</strong></span>
            <a :href="`mailto:${ticketDraft.customer.email}`" class="text-blue-600 underline">{{
              ticketDraft.customer.email
            }}</a>
            <a :href="`tel:${ticketDraft.customer.phone}`" class="text-blue-600 underline">{{
              ticketDraft.customer.phone
            }}</a>
          </div>
          <div class="mt-2 text-xs text-gray-500">
            Utworzono: {{ formatDate(ticketDraft.createdAt) }} | Zmieniono:
            {{ formatDate(ticketDraft.updatedAt) }} | Agent: {{ ticketDraft.assignedTo }}
          </div>
        </template>

        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="col-span-full">
              <label for="title" class="font-semibold block mb-2">Tytuł zgłoszenia</label>
              <InputText id="title" v-on:update:model-value="updateField('title', $event)" v-model="ticketDraft.title"
                fluid />
            </div>

            <div class="field">
              <label class="font-semibold block mb-2">Status</label>
              <Select v-model="ticketDraft.status" v-on:update:model-value="updateField('status', $event)"
                :options="STATUS_OPTIONS" optionLabel="label" optionValue="value" fluid />
            </div>

            <div class="field">
              <label class="font-semibold block mb-2">Priorytet</label>
              <Select v-model="ticketDraft.priority" v-on:update:model-value="updateField('priority', $event)"
                :options="PRIORITY_OPTIONS" optionLabel="label" optionValue="value" fluid />
            </div>

            <div class="col-span-full">
              <label for="desc" class="font-semibold block mb-2">Opis problemu</label>
              <Textarea id="desc" v-model="ticketDraft.description"
                v-on:update:model-value="updateField('description', $event)" rows="5" fluid auto-resize />
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-between gap-3">
            <Button label="Usuń zgłoszenie" severity="danger" text @click="requireConfirmation($event)" />

            <div class="flex justify-end gap-3">
              <Button label="Anuluj" severity="secondary" text @click="router.back()" />
              <Button label="Zapisz zmiany" icon="pi pi-check" :loading="isSaving" @click="handleSave" />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else-if="store.isLoading" class="flex justify-center p-10">
      <Message severity="info">Wczytywanie danych...</Message>
    </div>

    <div v-else class="max-w-md mx-auto mt-10 text-center">
      <Message severity="error">Nie znaleziono zgłoszenia #{{ ticketId }}</Message>
      <Button label="Wróć do listy" class="mt-4" @click="router.push('/tickets')" />
    </div>
  </main>
</template>
