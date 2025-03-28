import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { ApiCookieAuth } from '@nestjs/swagger';
import { StatusTicket } from './enums/statusticket.enum';

@ApiCookieAuth('token')
@UseGuards(AuthGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Req() request: Request, @Body() createTicketDto: CreateTicketDto) {
    try {
      const email = request.user.email;
      if (!email) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.ticketService.create(createTicketDto, email);
    } catch (err) {
      return err;
    }
  }

  @Get()
  findAll(@Req() request: Request) {
    try {
      const email = request.user.email;
      if (!email) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.ticketService.findAllByUserWithClient(email);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Patch(':id/developer')
  async updateDeveloper(@Param('id') id: string, @Body() idDeveloper: number) {
    console.log('foi');
    return await this.ticketService.updateDeveloper(+id, idDeveloper);
  }

  @Patch(':id/:status')
  async updateState(
    @Param('id') id: string,
    @Param('status') status: StatusTicket,
  ) {
    console.log('status', status);
    return await this.ticketService.updateState(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
