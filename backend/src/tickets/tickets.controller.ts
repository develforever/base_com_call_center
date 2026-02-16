import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse } from "tsoa";
import { Ticket, tickets } from "../models/ticket";

@Route("tickets")
export class TicketsController extends Controller {

    @Get("/")
    public async getTickets(): Promise<Ticket[]> {
        return tickets;
    }

    @SuccessResponse("201", "Created")
    @Post("/")
    public async createTicket(@Body() requestBody: Omit<Ticket, 'id'>): Promise<Ticket> {
        const newTicket = { id: Date.now(), ...requestBody };
        tickets.push(newTicket);
        return newTicket;
    }

    @Put("{id}")
    public async updateTicket(@Path() id: number, @Body() requestBody: Partial<Omit<Ticket, 'id'>>): Promise<Ticket | null> {
        const index = tickets.findIndex(t => t.id === id);
        if (index === -1) return null;
        tickets[index] = { ...tickets[index], ...requestBody };
        return tickets[index];
    }

    @Delete("{id}")
    public async deleteTicket(@Path() id: number): Promise<void> {
        const index = tickets.findIndex(t => t.id === id);
        if (index !== -1) {
            tickets.splice(index, 1);
        }
    }
}