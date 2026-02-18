import apiClient from '@/api/api.client'
import type { paths, components } from '@/types/api'

export type Ticket = components['schemas']['Ticket']
export type TicketStatus = components['schemas']['TicketStatus']
export type TicketPriority = components['schemas']['TicketPriority']

export type TicketCreationParams = components['schemas']['TicketCreationParams']
export type TicketUpdateParams = components['schemas']['TicketUpdateParams']

export type GetTicketsResponse = paths['/tickets']['get']['responses']['200']['content']['application/json'];
export type GetTicketByIdResponse = paths['/tickets/{id}']['get']['responses']['200']['content']['application/json'];
export type UpdateTicketResponse = paths['/tickets/{id}']['put']['responses']['200']['content']['application/json'];
export type CreateTicketResponse = paths['/tickets']['post']['responses']['201']['content']['application/json'];
export type DeleteTicketResponse = paths['/tickets/{id}']['delete']['responses']['200']['content'];

export const TicketsService = {
  async getAll(params?: paths['/tickets']['get']['parameters']['query']): Promise<GetTicketsResponse> {
    const response = await apiClient.get<GetTicketsResponse>('/tickets', { params });
    return response.data;
  },


  async getById(id: number): Promise<GetTicketByIdResponse> {
    const { data } = await apiClient.get<GetTicketByIdResponse>(`/tickets/${id}`)
    return data
  },

  async update(id: number, payload: TicketUpdateParams): Promise<UpdateTicketResponse> {
    const { data } = await apiClient.put<UpdateTicketResponse>(`/tickets/${id}`, payload)
    return data
  },

  async create(payload: TicketCreationParams): Promise<CreateTicketResponse> {
    const { data } = await apiClient.post<CreateTicketResponse>(`/tickets`, payload)
    return data
  },

  async delete(id: number): Promise<DeleteTicketResponse> {
    const { data } = await apiClient.delete<DeleteTicketResponse>(`/tickets/${id}`)
    return data
  },
}
