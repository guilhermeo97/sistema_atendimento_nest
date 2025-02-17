import { IsEnum, IsNotEmpty } from 'class-validator';
import { TypeDemand } from '../enums/typedemand.enum';
import { User } from 'src/user/entities/user.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsEnum(TypeDemand)
  typeDemand: TypeDemand;
  @IsNotEmpty()
  sprintName: string;
  client: User;
}
