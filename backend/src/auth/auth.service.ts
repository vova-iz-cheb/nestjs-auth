import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(data: RegisterDto) {
    const { login, email, password } = data;

    const user = await this.usersService.getUserByLoginOrEmail(login, email);

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

  async login(data: LoginDto) {
    const { login, password } = data;

    const user = await this.usersService.getUserByLoginOrEmail(login);

    if (!user) {
      throw new BadRequestException('Пользователь не найден.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) throw new BadRequestException('Неверный пароль.');

    // TODO вернуть jwt в заголовке
  }

  // recoveryPass

  // sendMail
}
