import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import DisplayTicketDto from './dto/displayticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(dto: CreateTicketDto) {
    const ticket = new Ticket(dto);
    const saveTicket = await this.ticketRepository.save(ticket);
    const displayTicket = new DisplayTicketDto(saveTicket);
    return displayTicket;
  }

  findAll() {
    return this.ticketRepository.find();
  }

  findOne(id: number) {
    return this.ticketRepository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateTicketDto) {
    return this.ticketRepository.update(id, dto);
  }

  remove(id: number) {
    return this.ticketRepository.delete(id);
  }
}
