import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Constants } from '../utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
// import { sendEmail } from './email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      return { message: 'email already exists', status: 'failure', data: [] };
    }
    let user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.ADMIN_ROLE;

    const result = this.userRepository.save(user);
    return { message: 'account created', status: 'success', data: result };
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
  findUserByID(id: number) {
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return { message: 'does not exist', status: 'failure', data: {} };
    }

    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    const result = this.userRepository.save(user);
    return { message: 'updated', status: 'success', data: result };
  }

  async remove(id: number) {
    const found = await this.userRepository.findOne({ where: { id } });
    if (found) {
      const del = this.userRepository.delete(id);
      return { message: '', status: 'success', data: del };
    } else {
      return { message: 'does not exist', status: 'failure', data: {} };
    }
  }
}
