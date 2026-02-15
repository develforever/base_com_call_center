import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import TicketsView from '../TicketsView.vue'
import { useTicketsStore } from '@/stores/useTicketsStore'

describe('TicketsView', () => {
  it('renders properly', async () => {
    const mockTickets = [
      {
        id: 1,
        title: 'Testowy ticket',
        description: 'Testowa opis zgłoszenia.',
        status: 'new',
        priority: 'high',
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

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockTickets,
    } as Response)

    const wrapper = mount(TicketsView)

    const store = useTicketsStore()

    await store.fetchTickets()

    expect(fetch).toHaveBeenCalledWith('/tickets.json')
    expect(store.tickets).toEqual(mockTickets.map((ticket) => ({ ...ticket, priorityValue: 3 })))
    expect(wrapper.text()).toContain('Testowy ticket')
  })
})
