/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TicketsController } from './tickets/tickets.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "TicketStatus": {
        "dataType": "refEnum",
        "enums": ["new","open","closed","pending","on_hold","cancelled"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TicketPriority": {
        "dataType": "refEnum",
        "enums": ["low","medium","high"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Customer": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"value":3}}},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true,"validators":{"pattern":{"value":"^\\+?[1-9]\\d{1,14}$"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ticket": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true,"validators":{"minLength":{"value":3},"maxLength":{"value":50}}},
            "description": {"dataType":"string","required":true,"validators":{"minLength":{"value":15},"maxLength":{"value":255}}},
            "status": {"ref":"TicketStatus","required":true},
            "priority": {"ref":"TicketPriority","required":true},
            "createdAt": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"string","required":true},
            "assignedTo": {"dataType":"string","required":true},
            "customer": {"ref":"Customer","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Ticket.Exclude_keyofTicket.id-or-createdAt-or-updatedAt__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","required":true,"validators":{"minLength":{"value":3},"maxLength":{"value":50}}},"description":{"dataType":"string","required":true,"validators":{"minLength":{"value":15},"maxLength":{"value":255}}},"status":{"ref":"TicketStatus","required":true},"priority":{"ref":"TicketPriority","required":true},"assignedTo":{"dataType":"string","required":true},"customer":{"ref":"Customer","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Ticket.id-or-createdAt-or-updatedAt_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Ticket.Exclude_keyofTicket.id-or-createdAt-or-updatedAt__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TicketCreationParams": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_Ticket.id-or-createdAt-or-updatedAt_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_Ticket.id-or-createdAt-or-updatedAt__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","validators":{"minLength":{"value":3},"maxLength":{"value":50}}},"description":{"dataType":"string","validators":{"minLength":{"value":15},"maxLength":{"value":255}}},"status":{"ref":"TicketStatus"},"priority":{"ref":"TicketPriority"},"assignedTo":{"dataType":"string"},"customer":{"ref":"Customer"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TicketUpdateParams": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_Ticket.id-or-createdAt-or-updatedAt__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsTicketsController_getTickets: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"TicketStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                assignedTo: {"in":"query","name":"assignedTo","dataType":"string"},
        };
        app.get('/api/v1/tickets',
            ...(fetchMiddlewares<RequestHandler>(TicketsController)),
            ...(fetchMiddlewares<RequestHandler>(TicketsController.prototype.getTickets)),

            async function TicketsController_getTickets(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTicketsController_getTickets, request, response });

                const controller = new TicketsController();

              await templateService.apiHandler({
                methodName: 'getTickets',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTicketsController_createTicket: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"TicketCreationParams"},
        };
        app.post('/api/v1/tickets',
            ...(fetchMiddlewares<RequestHandler>(TicketsController)),
            ...(fetchMiddlewares<RequestHandler>(TicketsController.prototype.createTicket)),

            async function TicketsController_createTicket(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTicketsController_createTicket, request, response });

                const controller = new TicketsController();

              await templateService.apiHandler({
                methodName: 'createTicket',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTicketsController_updateTicket: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"TicketUpdateParams"},
        };
        app.put('/api/v1/tickets/:id',
            ...(fetchMiddlewares<RequestHandler>(TicketsController)),
            ...(fetchMiddlewares<RequestHandler>(TicketsController.prototype.updateTicket)),

            async function TicketsController_updateTicket(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTicketsController_updateTicket, request, response });

                const controller = new TicketsController();

              await templateService.apiHandler({
                methodName: 'updateTicket',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTicketsController_deleteTicket: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/v1/tickets/:id',
            ...(fetchMiddlewares<RequestHandler>(TicketsController)),
            ...(fetchMiddlewares<RequestHandler>(TicketsController.prototype.deleteTicket)),

            async function TicketsController_deleteTicket(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTicketsController_deleteTicket, request, response });

                const controller = new TicketsController();

              await templateService.apiHandler({
                methodName: 'deleteTicket',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
