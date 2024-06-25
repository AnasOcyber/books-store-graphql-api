import { InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
