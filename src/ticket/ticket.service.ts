import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import DisplayTicketDto from './dto/displayticket.dto';
import { UserService } from 'src/user/user.service';
import { DisplayUserDto } from 'src/user/dto/display-user.dto';
import { StatusTicket } from './enums/statusticket.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateTicketDto, email: string) {
    try {
      const findClient = await this.userService.findByEmail(email);
      if (!findClient) {
        throw new NotFoundException('User not found');
      }
      dto.client = findClient;
      const saveTicket = await this.ticketRepository.save(dto);
      if (!saveTicket) {
        throw new NotFoundException('Ticket not created');
      }
      const displayTicket = new DisplayTicketDto(saveTicket, findClient);
      return displayTicket;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findAllByUserWithClient(email: string) {
    try {
      const findUser = await this.userService.findByEmail(email);
      if (!findUser) {
        throw new UnauthorizedException('User not found');
      }

      const findTickets = await this.ticketRepository.find({
        where: { client: findUser },
      });

      if (findTickets.length === 0) {
        return null;
      }
      const displayClient = new DisplayUserDto(findUser);

      const displayTickets = findTickets.map(
        (ticket) => new DisplayTicketDto(ticket, displayClient),
      );
      return displayTickets;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findOne(id: number) {
    return this.ticketRepository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateTicketDto) {
    return this.ticketRepository.update(id, dto);
  }

  async updateState(id: number, status: StatusTicket) {
    const buscar = await this.ticketRepository.findOne({ where: { id } });
    if (!buscar) {
      throw new NotFoundException('Ticket not found');
    }
    if (status === StatusTicket.DONE) {
      await this.ticketRepository.update(id, {
        status,
        updated_at: new Date(),
        closed_at: new Date(),
      });
    }
    await this.ticketRepository.update(id, {
      status,
      updated_at: new Date(),
    });
  }

  async updateDeveloper(id: number, idDeveloper: number) {
    const findTicket = await this.findOne(id);
    if (!findTicket) {
      throw new NotFoundException('Ticket not found');
    }
    const findUser = await this.userService.findOne(idDeveloper);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    await this.ticketRepository.update(id, {
      developer: findUser,
      updated_at: new Date(),
    });
  }

  async remove(id: number) {
    return this.ticketRepository.delete(id);
  }
}
