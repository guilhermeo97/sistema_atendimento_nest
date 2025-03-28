import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BcryptEntity from 'src/utils/bcrypt.entity';
import { DisplayUserDto } from './dto/display-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptEntity: BcryptEntity,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User(createUserDto);
      const findUser = await this.findByEmail(user.email);
      if (findUser) {
        throw new BadRequestException('Email already exists');
      }
      user.password = await this.bcryptEntity.hash(user.password);
      const newUser = await this.userRepository.save(user);
      if (!newUser) {
        return null;
      }
      const displayUser = new DisplayUserDto(newUser);
      return displayUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id: id } });
    if (!findUser) {
      return null;
    }
    return findUser;
  }

  async findByEmail(email: string) {
    const findUser = await this.userRepository.findOne({ where: { email } });
    if (!findUser) {
      return null;
    }
    return findUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = this.findOne(id);
    if (!findUser) {
      return null;
    }
    const updateUser = this.userRepository.update(id, updateUserDto);
    if (!updateUser) {
      return null;
    }
    return updateUser;
  }
  async remove(id: number) {
    const findUser = await this.findOne(id);
    if (!findUser) {
      return null;
    }
    findUser.isActive = false;
    const removeUser = await this.userRepository.save(findUser);
    if (!removeUser.isActive) {
      return null;
    }
    return true;
  }
}
