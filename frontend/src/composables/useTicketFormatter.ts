import { priorityLabels, statusLabels } from '@/stores/useTicketsStore'
import { TicketPriority, TicketStatus } from '@/types/types'

export const STATUS_SEVERITY: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'danger',
  [TicketStatus.PENDING]: 'warn',
  [TicketStatus.CLOSED]: 'success',
  [TicketStatus.NEW]: 'info',
  [TicketStatus.ON_HOLD]: 'secondary',
  [TicketStatus.CANCELLED]: 'secondary',
}

export const PRIORITY_SEVERITY: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: 'success',
  [TicketPriority.MEDIUM]: 'warn',
  [TicketPriority.HIGH]: 'danger',
}

export const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({
  label,
  value,
}))
export const priorityOptions = Object.entries(priorityLabels).map(([value, label]) => ({
  label,
  value,
}))
