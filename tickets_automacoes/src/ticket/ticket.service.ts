import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import DisplayTicketDto from './dto/displayticket.dto';
import { UserService } from 'src/user/user.service';
import { DisplayUserDto } from 'src/user/dto/display-user.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateTicketDto) {
    const ticket = new Ticket(dto);
    const saveTicket = await this.ticketRepository.save(ticket);
    const displayTicket = new DisplayTicketDto(saveTicket);
    return displayTicket;
  }

  async findAllByUserWithClient(token: string) {
    const findUser = await this.userService.findByEmail(token);
    if (!findUser) {
      return null;
    }

    const findTickets = await this.ticketRepository.find({
      where: { client: findUser.id },
    });

    if (findTickets.length === 0) {
      return null;
    }
    const displayUsers = new DisplayUserDto(findUser);
    const displayTickets = findTickets.map(
      (ticket) => new DisplayTicketDto(ticket),
    );
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
