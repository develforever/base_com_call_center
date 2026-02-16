import initialTickets from "../../data/tickets.json";
import { Ticket, TicketStatus } from "../types";

const ticketsDb: Ticket[] = [...initialTickets] as Ticket[];

export const TicketService = {
    getAll: (status?: TicketStatus, search?: string, assignedTo?: string) => {
        let filteredTickets = [...ticketsDb];

        if (status) {
            filteredTickets = filteredTickets.filter(t => t.status === status);
        }

        if (assignedTo) {
            filteredTickets = filteredTickets.filter(t =>
                t.assignedTo.toLowerCase() === assignedTo.toLowerCase()
            );
        }

        if (search) {
            const query = search.toLowerCase();
            filteredTickets = filteredTickets.filter(t =>
                t.title.toLowerCase().includes(query) ||
                t.customer.name.toLowerCase().includes(query)
            );
        }

        return filteredTickets;
    },
    add: (ticket: Ticket) => ticketsDb.push(ticket),
    update: (id: number, ticket: Ticket) => {
        const index = ticketsDb.findIndex(t => t.id === id);
        if (index !== -1) {
            ticketsDb[index] = ticket;
        }
    },
    remove: (id: number) => {
        const index = ticketsDb.findIndex(t => t.id === id);
        if (index !== -1) {
            ticketsDb.splice(index, 1);
        }
    }
};