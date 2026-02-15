import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import TicketsView from '../TicketsView.vue'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { TicketService } from '@/services/useTicketService'
import { TicketPriority, TicketStatus, type Ticket } from '@/types/types'

describe('TicketsView', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockReset()
  })

  it('renders properly', async () => {
    const mockTickets: Ticket[] = [
      {
        id: 1,
        title: 'Testowy ticket',
        description: 'Testowa opis zgłoszenia.',
        status: TicketStatus.NEW,
        priority: TicketPriority.HIGH,
        createdAt: '2024-05-09T09:20:00Z',
        updatedAt: '2024-05-09T09:30:00Z',
        assignedTo: 'Patrycja Nowak',
        customer: {
          name: 'Testowy klient',
          email: 'testowy@klient.pl',
          phone: '111000111',
        },
      },
    ]

    vi.mocked(TicketService.getAll).mockResolvedValue(mockTickets)

    const wrapper = mount(TicketsView)

    const store = useTicketsStore()

    await store.fetchTickets()

    expect(TicketService.getAll).toHaveBeenCalled()
    expect(store.tickets).toEqual(mockTickets.map((ticket) => ({ ...ticket, priorityValue: 3 })))
    expect(wrapper.text()).toContain('Testowy ticket')
  })
})
