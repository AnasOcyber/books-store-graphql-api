import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { CreateBookInput } from './dtos/create-book.input';
import { UpdateBookInput } from './dtos/update-book.input';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entity/author.entity';

@Resolver()
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book], { nullable: true })
  getBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query(() => Book, { nullable: true })
  getBook(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book, { nullable: true })
  createBook(
    @Args('createBookInput')
    createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.booksService.create(createBookInput);
  }

  @Mutation(() => Book, { nullable: true })
  updateBook(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookInput);
  }

  @Mutation(() => Book, { nullable: true })
  deleteBook(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Book> {
    return this.booksService.remove(id);
  }

  // Nested queries and mutations

  @Query(() => [Book], { nullable: true })
  getUserBooks(@Args('id', { type: () => ID }) id: number) {
    return this.booksService.getUserBooks(id);
  }

  @Query(() => [Book], { nullable: true })
  getAuthorBooks(@Args('id', { type: () => ID }) id: number) {
    return this.booksService.getAuthorBooks(id);
  }

  @Query(() => Author, { nullable: true })
  getBookAuthor(@Args('id', { type: () => ID }) id: number) {
    return this.booksService.getBookAuthor(id);
  }
  @Mutation(() => Book, { nullable: true })
  assignBookToAuthor(
    @Args('bookId', { type: () => ID }) bookId: number,
    @Args('authorId', { type: () => ID }) authorId: number,
  ) {
    return this.booksService.assignBookToAuthor(bookId, authorId);
  }

  @Mutation(() => Book, { nullable: true })
  assignBookToUser(
    @Args('bookId', { type: () => ID }) bookId: number,
    @Args('userId', { type: () => ID }) userId: number,
  ) {
    return this.booksService.assignBookToUser(bookId, userId);
  }
}
