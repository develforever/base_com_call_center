<script setup lang="ts">
import { priorityLabels, statusLabels, useTicketsStore } from '@/stores/useTicketsStore'
import { Button, Card, InputText, Message, Select, Textarea } from 'primevue'
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue'
import PageNav from '@/components/PageNav.vue'

const toast = useToast()
const router = useRouter()
const store = useTicketsStore()
const { id } = useRoute().params
const ticket = computed(() => store.ticket)
const isSaving = ref(false)

const statuses = (Object.keys(statusLabels) as Array<keyof typeof statusLabels>).map((key) => ({
  label: statusLabels[key],
  value: key,
}))
const priorities = (Object.keys(priorityLabels) as Array<keyof typeof priorityLabels>).map(
  (key) => ({
    label: priorityLabels[key],
    value: key,
  }),
)

onMounted(() => {
  store.fetchTicket(Number(new Number(id)))
})

onUnmounted(() => {
  store.resetTicket()
})

const handleSave = async () => {
  if (!ticket.value) return

  isSaving.value = true
  const success = await store.updateTicket(ticket.value)
  isSaving.value = false

  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Zapisano',
      detail: 'Zmiany zapisane',
      life: 3000,
    })
    router.back()
  }
}
</script>

<template>
  <main>
    <PageNav />

    <div class="ticket-details-container" v-if="ticket">
      <Card>
        <template #title>Zgłoszenie #{{ ticket.id }}</template>

        <template #subtitle>
          Klient: {{ ticket.customer.name }},
          <a :href="`mailto:${ticket.customer.email}`">{{ ticket.customer.email }}</a
          >, <a :href="`tel:${ticket.customer.phone}`">{{ ticket.customer.phone }}</a> <br />
          | Utworzono: {{ new Date(ticket.createdAt).toLocaleString() }} | Zmieniono:
          {{ new Date(ticket.updatedAt).toLocaleString() }} | Przypisany do: {{ ticket.assignedTo }}
        </template>

        <template #content>
          <div class="flex flex-col gap-4">
            <div class="field">
              <label for="title" class="font-bold block mb-2">Tytuł zgłoszenia</label>
              <InputText id="title" v-model="ticket.title" fluid />
            </div>

            <div class="formgrid grid">
              <div class="field col">
                <label class="font-bold block mb-2">Status</label>
                <Select
                  v-model="ticket.status"
                  :options="statuses"
                  optionLabel="label"
                  optionValue="value"
                  fluid
                />
              </div>

              <div class="field col">
                <label class="font-bold block mb-2">Priorytet</label>
                <Select
                  v-model="ticket.priority"
                  :options="priorities"
                  optionLabel="label"
                  optionValue="value"
                  fluid
                  class="capitalize"
                />
              </div>
            </div>

            <div class="field">
              <label for="desc" class="font-bold block mb-2">Opis problemu</label>
              <Textarea id="desc" v-model="ticket.description" rows="5" fluid />
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-end gap-2">
            <Button label="Anuluj" severity="secondary" outlined @click="router.back()" />
            <Button
              label="Zapisz zmiany"
              icon="pi pi-check"
              :loading="isSaving"
              @click="handleSave"
            />
          </div>
        </template>
      </Card>
    </div>

    <div v-else-if="store.isLoading">
      <Message severity="info">Wczytywanie zgłoszenia...</Message>
    </div>
    <div v-else class="p-4">
      <Message severity="error">Nie znaleziono zgłoszenia o podanym ID #{{ id }}.</Message>
    </div>
  </main>
</template>
