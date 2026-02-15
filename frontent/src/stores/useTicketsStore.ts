import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TicketService } from '@/services/useTicketService'
import { TicketPriority } from '@/types/types'
import { TicketStatus } from '@/types/types'
import type { Ticket } from '@/types/types'

export const priorityWeights: Record<TicketPriority, number> = {
  [TicketPriority.LOW]: 1,
  [TicketPriority.MEDIUM]: 2,
  [TicketPriority.HIGH]: 3,
}

export const statusLabels: Record<TicketStatus, string> = {
  [TicketStatus.NEW]: 'Nowy',
  [TicketStatus.OPEN]: 'Otwarty',
  [TicketStatus.PENDING]: 'Oczekujący',
  [TicketStatus.ON_HOLD]: 'Wstrzymany',
  [TicketStatus.CLOSED]: 'Zamknięty',
  [TicketStatus.CANCELLED]: 'Anulowany',
}

export const priorityLabels: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: 'Niski',
  [TicketPriority.MEDIUM]: 'Średni',
  [TicketPriority.HIGH]: 'Wysoki',
}

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([])
  const ticket = ref<Ticket | null>(null)
  const isLoading = ref(false)
  const filterStatus = ref<TicketStatus | null>(null)
  const filterPriority = ref<TicketPriority | null>(null)

  const filteredTickets = computed(() => {
    return tickets.value
      .filter((ticket) => (filterStatus.value ? ticket.status === filterStatus.value : true))
      .filter((ticket) => (filterPriority.value ? ticket.priority === filterPriority.value : true))
  })

  const newTickets = computed(() => {
    return tickets.value.filter((ticket) => ticket.status === TicketStatus.NEW)
  })

  const highPriorityTickets = computed(() => {
    return tickets.value.filter((ticket) => ticket.priority === TicketPriority.HIGH)
  })

  async function fetchTickets() {
    isLoading.value = true

    try {
      if (tickets.value.length === 0) {
        const data: Ticket[] = await TicketService.getAll()
        tickets.value = data.map((ticket) => ({
          ...ticket,
          priorityValue: priorityWeights[ticket.priority],
        }))
      }
    } catch (error) {
      console.error('Błąd pobierania:', error)
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
    } catch (error) {
      console.error('Błąd pobierania:', error)
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
      } catch (error) {
        console.error('Błąd aktualizacji:', error)
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
  }
})
