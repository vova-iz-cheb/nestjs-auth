import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  login: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
