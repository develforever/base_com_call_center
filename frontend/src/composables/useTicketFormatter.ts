import { TicketPriority, TicketStatus } from '@/types/api'

export const STATUS_SEVERITY: Record<TicketStatus, string> = {
  [TicketStatus.open]: 'danger',
  [TicketStatus.pending]: 'warn',
  [TicketStatus.closed]: 'success',
  [TicketStatus.new]: 'info',
  [TicketStatus.on_hold]: 'secondary',
  [TicketStatus.cancelled]: 'secondary',
}

export const PRIORITY_SEVERITY: Record<TicketPriority, string> = {
  [TicketPriority.low]: 'success',
  [TicketPriority.medium]: 'warn',
  [TicketPriority.high]: 'danger',
}

export const priorityWeights: Record<TicketPriority, number> = {
  [TicketPriority.low]: 1,
  [TicketPriority.medium]: 2,
  [TicketPriority.high]: 3,
}

export const statusLabels: Record<TicketStatus, string> = {
  [TicketStatus.new]: 'Nowy',
  [TicketStatus.open]: 'Otwarty',
  [TicketStatus.pending]: 'Oczekujący',
  [TicketStatus.on_hold]: 'Wstrzymany',
  [TicketStatus.closed]: 'Zamknięty',
  [TicketStatus.cancelled]: 'Anulowany',
}

export const priorityLabels: Record<TicketPriority, string> = {
  [TicketPriority.low]: 'Niski',
  [TicketPriority.medium]: 'Średni',
  [TicketPriority.high]: 'Wysoki',
}

export const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({
  label,
  value,
}))
export const priorityOptions = Object.entries(priorityLabels).map(([value, label]) => ({
  label,
  value,
}))
