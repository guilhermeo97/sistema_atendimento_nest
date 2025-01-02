import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [TicketModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
