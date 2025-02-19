import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'email is invalid' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;
  @IsNotEmpty({ message: 'password is required' })
  password: string;
  @IsNotEmpty({ message: 'first name is required' })
  firstName: string;
  @IsNotEmpty({ message: 'last name is required' })
  lastName: string;
}
