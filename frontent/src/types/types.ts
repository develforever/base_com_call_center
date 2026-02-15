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
