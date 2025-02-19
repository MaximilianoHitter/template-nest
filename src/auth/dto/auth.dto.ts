import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'email isinvalid' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
