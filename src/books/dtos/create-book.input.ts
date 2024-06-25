import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @MinLength(10)
  title: string;

  @IsNotEmpty()
  authorId: number;
}
