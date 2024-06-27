import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class SignupDto {
  @IsOptional()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
