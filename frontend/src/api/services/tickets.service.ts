import apiClient from '@/api/api.client'
import type { components } from '@/types/api.d';

export type Ticket = components["schemas"]["Ticket"];
export type TicketStatus = components["schemas"]["TicketStatus"];
export type TicketPriority = components["schemas"]["TicketPriority"];

export type TicketCreationParams = components["schemas"]["TicketCreationParams"];
export type TicketUpdateParams = components["schemas"]["TicketUpdateParams"];

export const TicketsService = {
  async getAll(): Promise<Ticket[]> {
    const { data } = await apiClient.get<Ticket[]>('/tickets')
    return data
  },

  async getById(id: number): Promise<Ticket> {
    const { data } = await apiClient.get<Ticket>(`/tickets/${id}`)
    return data
  },

  async update(id: number, payload: TicketUpdateParams): Promise<Ticket> {
    const { data } = await apiClient.put<Ticket>(`/tickets/${id}`, payload)
    return data
  },

  async create(payload: TicketCreationParams): Promise<Ticket> {
    const { data } = await apiClient.post<Ticket>(`/tickets`, payload)
    return data
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/tickets/${id}`)
  },
}
