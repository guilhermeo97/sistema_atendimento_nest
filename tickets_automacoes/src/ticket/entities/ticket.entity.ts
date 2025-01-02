import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { StatusTicket } from '../enums/statusticket.enum';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ default: StatusTicket.OPEN })
  status: StatusTicket;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column()
  updated_at: Date;
  @Column()
  closed_at: Date;

  constructor(dto: CreateTicketDto) {
    if (dto) {
      this.title = dto.title;
      this.description = dto.description;
    }
    this.created_at = new Date();
    this.updated_at = new Date();
    this.status = StatusTicket.OPEN;
  }
}
