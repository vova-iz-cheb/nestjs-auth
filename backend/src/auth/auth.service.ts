import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(data: RegistrationDto) {
    const { login, email, password } = data;

    const user = await this.usersService.getUserByLoginOrEmail(login, email);
    console.log('user', user);

    if (user) {
      throw new BadRequestException(
        'Пользователь с таким логином или почтой уже существует.',
      );
    }

    // TODO: добавить pepper

    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      await this.usersService.createUser(login, email, hash);
    } catch {
      throw new InternalServerErrorException(
        'Не удалось зарегистрировать пользователя.',
      );
    }
  }

  // recoveryPass

  // login

  // sendMail
}
