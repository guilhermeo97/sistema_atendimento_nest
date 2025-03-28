import { User } from '../entities/user.entity';

export class DisplayUserDto {
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  manager: string;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.jobTitle = user.jobTitle;
    this.department = user.department;
    this.manager = user.manager;
  }
}
