import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export enum TicketStatus {
  NEW = 'new',
  OPEN = 'open',
  CLOSED = 'closed',
  PENDING = 'pending',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Customer {
  name: string
  email: string
  phone: string
}

export interface Ticket {
  id: number
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  updatedAt: string
  priorityValue?: number
  assignedTo?: string
  customer: Customer
}

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
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await fetch('/tickets.json')
        const data: Ticket[] = await response.json()
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
