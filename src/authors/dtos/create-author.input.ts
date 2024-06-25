import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @MinLength(3)
  name: string;
}
