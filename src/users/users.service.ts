import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const userEmail = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!email) {
      throw new NotFoundException();
    }

    return userEmail;
  }

  async createUser(user: Pick<UsersModel, 'username' | 'email' | 'password'>) {
    // 1) nickname 중복 확인
    // exist() -> 조건에 해당 되는 값이 있으면 true
    const usernameExists = await this.usersRepository.exists({
      where: {
        username: user.username,
      },
    });

    if (usernameExists) {
      throw new BadRequestException('이미 존재하는 username 입니다!');
    }

    const emailExists = await this.usersRepository.exists({
      where: {
        email: user.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 존재하는 email 입니다!');
    }

    const userObject = this.usersRepository.create({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }
}
