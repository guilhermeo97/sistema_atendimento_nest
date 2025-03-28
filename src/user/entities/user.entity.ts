import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'varchar', nullable: true })
  manager: string;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
  @Column({ type: 'varchar', nullable: true })
  jobTitle: string;
  @Column({ type: 'varchar', nullable: true })
  department: string;
  @OneToMany(() => Ticket, (ticket) => ticket.client)
  ticketsWithClient: Ticket[];
  @OneToMany(() => Ticket, (ticket) => ticket.developer)
  ticketsWithDeveloper: Ticket[];

  constructor(dto: CreateUserDto) {
    if (dto) {
      this.name = dto.name;
      this.email = dto.email;
      this.password = dto.password;
      this.jobTitle = dto.jobTitle;
      this.department = dto.department;
      this.manager = dto.manager;
    }
    this.createdAt = new Date();
    this.isActive = true;
  }
}
