import apiClient from '@/api/api.client'
import type { Ticket } from '@/types/types'

export const TicketsService = {
  async getAll(): Promise<Ticket[]> {
    const { data } = await apiClient.get<Ticket[]>('/tickets.json')
    return data
  },

  // TODO: Implement
  async getById(id: number): Promise<Ticket> {
    const { data } = await apiClient.get<Ticket>(`/tickets/${id}`)
    return data
  },

  // TODO: Implement
  async update(id: number, payload: Partial<Ticket>): Promise<Ticket> {
    const { data } = await apiClient.patch<Ticket>(`/tickets/${id}`, payload)
    return data
  },
}
