import { TicketPriority, TicketStatus, type Ticket } from '@/types/types'
import { z } from 'zod'

const CustomerSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
})

export const TicketSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string(),
  status: z.enum(Object.values(TicketStatus) as [string, ...string[]]),
  priority: z.enum(Object.values(TicketPriority) as [string, ...string[]]),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  assignedTo: z.string(),
  customer: CustomerSchema,
})

export const TicketArraySchema = z.array(TicketSchema)

export type TicketSchemaType = z.infer<typeof TicketSchema>

export const TicketsService = {
  async getAll(): Promise<Ticket[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const response = await fetch('/api/tickets.json')

    const rawData = await response.json()

    const result = TicketArraySchema.safeParse(rawData)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        console.error(`Error in field: ${issue.path.join('.')}, Message: ${issue.message}`)
      })
      throw new Error('JSON validation failed')
    }

    return rawData
  },
}
