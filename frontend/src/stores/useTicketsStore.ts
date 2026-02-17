import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TicketsService, type Ticket } from '@/api/services/tickets.service'
import { TicketPriority, TicketStatus } from '@/types/api'
import { priorityWeights } from '@/composables/useTicketFormatter'

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
      const data = tickets.value.find((t) => t.id === id)

      ticket.value = data || null
    } catch (err) {
      error.value = err as Error
      console.error('Błąd pobierania:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function updateTicket(updatedTicket: Ticket) {
    const index = tickets.value.findIndex((t) => t.id === updatedTicket.id)

    if (index !== -1) {
      try {
        const ticketToStore = {
          ...updatedTicket,
          updatedAt: new Date().toISOString(),
        }

        tickets.value.splice(index, 1, ticketToStore)

        return true
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
  }
})
