import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TicketsService } from '@/services/useTicketService'
import { TicketPriority, TicketStatus, type Ticket } from '@/types/types'

vi.unmock('@/services/useTicketService')

describe('TicketsService', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockReset()
  })

  it('should fetch a list of tickets (success)', async () => {
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

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockTickets,
    } as Response)

    const result = await TicketsService.getAll()

    expect(fetch).toHaveBeenCalledWith('/api/tickets.json')
    expect(result).toEqual(mockTickets)
  })

  it('should throw an error when response is not OK (failure)', async () => {
    const consoleSpy = vi.spyOn(console, 'error')

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => [
        {
          id: 1,
          title: 'Testowy ticket',
          description: null,
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
      ],
    } as Response)
    await expect(TicketsService.getAll()).rejects.toThrow('JSON validation failed')

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error in field: 0.description'),
    )
    consoleSpy.mockRestore()
  })
})
