import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { StatusTicket } from '../enums/statusticket.enum';
import { User } from '../../user/entities/user.entity';
import { TypeDemand } from '../enums/typedemand.enum';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'enum', enum: TypeDemand })
  typeDemand: TypeDemand;
  @Column()
  sprintName: string;
  @ManyToOne(() => User, (user) => user.ticketsWithClient, {
    eager: true,
    nullable: false,
  })
  client: User;
  @ManyToOne(() => User, (user) => user.ticketsWithDeveloper, {
    eager: true,
  })
  developer: User;
  @Column({ default: StatusTicket.OPEN })
  status: StatusTicket;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  closed_at: Date;

  constructor(dto: CreateTicketDto) {
    if (dto) {
      this.title = dto.title;
      this.description = dto.description;
      this.typeDemand = dto.typeDemand;
      this.sprintName = dto.sprintName;
    }
    this.status = StatusTicket.OPEN;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
