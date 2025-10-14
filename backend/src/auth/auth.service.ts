import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  register(data: RegistrationDto) {
    console.log('data', data);
    // TODO создать в бд строку - login, encrypted pass, email, isVerified false
    return 'good';
  }

  // recoveryPass

  // login

  // sendMail
}
