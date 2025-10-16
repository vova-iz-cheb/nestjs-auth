import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const { login, email, password } = data;

    const user = await this.usersService.getUserByLoginOrEmail(login, email);

    if (user) {
      throw new BadRequestException(
        'Пользователь с таким логином или почтой уже существует',
      );
    }

    // TODO: добавить pepper

    try {
      // TODO: лучше вынести в passwordService и bcrypt.compare тоже туда
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      await this.usersService.createUser(login, email, hash);
    } catch {
      throw new InternalServerErrorException(
        'Не удалось зарегистрировать пользователя',
      );
    }
  }

  async login(data: LoginDto) {
    const { login, password } = data;

    const user = await this.usersService.getUserByLoginOrEmail(login);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) throw new UnauthorizedException('Неверный пароль');

    // TODO isVerified false - просить подтвердить почту

    // TODO jwtService
    const payload: JwtPayload = {
      sub: user.id,
      login: user.login,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    console.log('accessToken', accessToken);

    return { accessToken };
  }

  checkProtectedResource() {
    return { secret: 'I love you' };
  }

  // recoveryPass

  // sendMail
}
