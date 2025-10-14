import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}

  getUserByLoginOrEmail(login: string, email: string) {
    return this.userService.findOne({
      where: [{ login }, { email }],
    });
  }

  async createUser(login: string, email: string, passwordHash: string) {
    const isVerified = false;

    const user = this.userService.create({
      login,
      email,
      passwordHash,
      isVerified,
    });

    await this.userService.save(user);
  }
}
