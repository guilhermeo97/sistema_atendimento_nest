import { Ticket } from '../entities/ticket.entity';
import { StatusTicket } from '../enums/statusticket.enum';

export default class DisplayTicketDto {
  id: number;
  title: string;
  description: string;
  status: StatusTicket;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;

  constructor(ticket: Ticket) {
    this.id = ticket.id;
    this.title = ticket.title;
    this.description = ticket.description;
    this.created_at = ticket.created_at;
    this.updated_at = ticket.updated_at;
    this.closed_at = ticket.closed_at;
    this.status = ticket.status;
  }
}
