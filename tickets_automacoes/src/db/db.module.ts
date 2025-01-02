import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: 'root',
      password: '0597',
      database: 'tickets_automacoes',
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['db/migrations/*.ts'],
    }),
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}
