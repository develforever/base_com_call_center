export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: 'open' | 'closed';
}


export const tickets: Ticket[] = [
    { id: 1, title: "Test Ticket", description: "Pierwsze zgłoszenie", status: 'open' }
];