import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import TicketsView from '@/views/TicketsView.vue'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { TicketsService, type Ticket } from '@/api/services/tickets.service'
import { TicketStatus, TicketPriority } from '@/types/api'

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
        status: TicketStatus.new,
        priority: TicketPriority.high,
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

    vi.mocked(TicketsService.getAll).mockResolvedValue(mockTickets)

    const wrapper = mount(TicketsView)

    const store = useTicketsStore()

    await store.fetchTickets()

    expect(TicketsService.getAll).toHaveBeenCalled()
    expect(store.tickets).toEqual(mockTickets.map((ticket) => ({ ...ticket, priorityValue: 3 })))
    expect(wrapper.text()).toContain('Testowy ticket')
  })
})
