import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { CreateAuthorInput } from './dtos/create-author.input';
import { UpdateAuthorInput } from './dtos/update-author.input';
import { Author } from './entity/author.entity';

@Resolver()
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author], { nullable: true })
  getAuthors(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { nullable: true })
  getAuthor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => Author, { nullable: true })
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ): Promise<Author> {
    return this.authorsService.create(createAuthorInput);
  }

  @Mutation(() => Author, { nullable: true })
  updateAuthor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ): Promise<Author> {
    return this.authorsService.update(id, updateAuthorInput);
  }

  @Mutation(() => Author, { nullable: true })
  deleteAuthor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Author> {
    return this.authorsService.remove(id);
  }
}
