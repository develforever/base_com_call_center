
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
    /**
     * @minLength 3
     */
    name: string;

    /**
     * @format email
     */
    email: string;

    /**
     * Numer telefonu w formacie międzynarodowym (np. +48123456789)
     * @pattern ^\+?[1-9]\d{1,14}$
     */
    phone: string
}

export interface Ticket {
    id: number,
    /**
     * @minLength 3
     * @maxLength 50
     */
    title: string,
    /**
     * @minLength 15
     * @maxLength 255
     */
    description: string,
    status: TicketStatus,
    priority: TicketPriority,
    createdAt: string,
    updatedAt: string,
    assignedTo: string,
    customer: Customer
}

export type TicketCreationParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;
export type TicketUpdateParams = Partial<Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>>;