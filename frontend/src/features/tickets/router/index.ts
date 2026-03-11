export enum RouteNames {
  Tickets = 'tickets',
  Ticket = 'ticket',
}

const routes = [
  {
    path: 'tickets',
    name: RouteNames.Tickets,
    component: () => import('@/features/tickets/views/TicketsView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: 'ticket/:id',
    name: RouteNames.Ticket,
    component: () => import('@/features/tickets/views/TicketView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

export { routes }
