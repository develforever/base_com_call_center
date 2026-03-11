import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse } from "tsoa";
import { TicketService } from "./models/ticket";
import { Ticket, TicketCreationParams, TicketStatus, TicketUpdateParams } from "./types";

@Route("tickets")
export class TicketsController extends Controller {

    @Get("/")
    public async getTickets(
        @Query() status?: TicketStatus,
        @Query() search?: string,
        @Query() assignedTo?: string
    ): Promise<Ticket[]> {
        return TicketService.getAll(status, search, assignedTo);
    }

    @SuccessResponse("201", "Created")
    @Post("/")
    public async createTicket(@Body() requestBody: TicketCreationParams): Promise<Ticket> {

        const now = new Date().toISOString();
        const newTicket: Ticket = {
            ...requestBody,
            id: Date.now(),
            createdAt: now,
            updatedAt: now,
        };

        TicketService.add(newTicket);
        return newTicket;
    }

    @Put("{id}")
    public async updateTicket(@Path() id: number, @Body() requestBody: TicketUpdateParams): Promise<Ticket | null> {
        const ticket = TicketService.getAll().find(t => t.id === id);
        if (!ticket) return null;
        const updatedTicket = { ...ticket, ...requestBody, updatedAt: new Date().toISOString() };
        TicketService.update(id, updatedTicket);
        return updatedTicket;
    }

    @Get("{id}")
    public async getTicketById(@Path() id: number): Promise<Ticket | null> {
        const ticket = TicketService.getAll().find(t => t.id === id);
        return ticket || null;
    }

    @Delete("{id}")
    public async deleteTicket(@Path() id: number): Promise<boolean> {
        const ticket = TicketService.getAll().find(t => t.id === id);
        if (!ticket) return false;
        const updatedTicket = { ...ticket, updatedAt: new Date().toISOString() };
        TicketService.update(id, updatedTicket);
        return true;
    }
}