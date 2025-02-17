import { User } from 'src/user/entities/user.entity';
import { Ticket } from '../entities/ticket.entity';
import { StatusTicket } from '../enums/statusticket.enum';
import { TypeDemand } from '../enums/typedemand.enum';
import { DisplayUserDto } from 'src/user/dto/display-user.dto';

export default class DisplayTicketDto {
  id: number;
  title: string;
  description: string;
  typeDemand: TypeDemand;
  status: StatusTicket;
  client: DisplayUserDto;
  developer!: DisplayUserDto;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;

  constructor(ticket: Ticket, client: DisplayUserDto) {
    this.id = ticket.id;
    this.title = ticket.title;
    this.description = ticket.description;
    this.typeDemand = ticket.typeDemand;
    this.client = client;
    this.developer = ticket.developer;
    this.created_at = ticket.created_at;
    this.updated_at = ticket.updated_at;
    this.closed_at = ticket.closed_at;
    this.status = ticket.status;
  }
}
