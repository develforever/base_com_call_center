import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  TicketsService,
  type Ticket,
  type TicketUpdateParams,
} from '@/api/services/tickets.service'
import { TicketPriority, TicketStatus } from '@/types/api'
import { priorityWeights } from '@/features/tickets/composables/useTicketFormatter'

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([])
  const ticket = ref<Ticket | null>(null)
  const isLoading = ref(false)
  const filterStatus = ref<TicketStatus | null>(null)
  const filterPriority = ref<TicketPriority | null>(null)
  const error = ref<Error | null>(null)

  const filteredTickets = computed(() => {
    return tickets.value
      .filter((ticket) => (filterStatus.value ? ticket.status === filterStatus.value : true))
      .filter((ticket) => (filterPriority.value ? ticket.priority === filterPriority.value : true))
  })

  const newTickets = computed(() => {
    return tickets.value.filter((ticket) => ticket.status === TicketStatus.new)
  })

  const highPriorityTickets = computed(() => {
    return tickets.value.filter((ticket) => ticket.priority === TicketPriority.high)
  })

  async function fetchTickets() {
    isLoading.value = true

    try {
      if (tickets.value.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data: Ticket[] = await TicketsService.getAll()

        if (!data || data.length === 0) {
          throw new Error('No tickets found')
        }

        tickets.value = data.map((ticket) => ({
          ...ticket,
          priorityValue: priorityWeights[ticket.priority],
        }))
      }
    } catch (err) {
      error.value = err as Error
      console.error('Błąd pobierania:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTicket(id: number) {
    isLoading.value = true
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const data = await TicketsService.getById(id)

      ticket.value = data
    } catch (err) {
      error.value = err as Error
      console.error('Błąd pobierania:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function updateTicket(id: number, updatedTicket: TicketUpdateParams) {
    const index = tickets.value.findIndex((t) => t.id === id)

    if (index !== -1) {
      try {
        const data = await TicketsService.update(id, updatedTicket)

        if (data) {
          tickets.value[index] = data
          ticket.value = data
          return true
        }
      } catch (err) {
        error.value = err as Error
        console.error('Błąd aktualizacji:', err)
        return false
      }
    }
    return false
  }

  function resetTicket() {
    ticket.value = null
  }

  function setStatusFilter(status: TicketStatus | null) {
    filterStatus.value = status
  }

  function setPriorityFilter(priority: TicketPriority | null) {
    filterPriority.value = priority
  }

  async function deleteTicket(id: number) {
    const index = tickets.value.findIndex((t) => t.id === id)

    if (index !== -1) {
      try {
        const data = await TicketsService.delete(id)

        if (data) {
          tickets.value.splice(index, 1)
          ticket.value = null
          return true
        }
      } catch (err) {
        error.value = err as Error
        console.error('Błąd usuwania:', err)
        return false
      }
    }
    return false
  }

  return {
    tickets,
    filteredTickets,
    fetchTickets,
    isLoading,
    ticket,
    fetchTicket,
    updateTicket,
    resetTicket,
    setStatusFilter,
    setPriorityFilter,
    newTickets,
    highPriorityTickets,
    error,
    clearError: () => {
      error.value = null
    },
    deleteTicket,
  }
})
