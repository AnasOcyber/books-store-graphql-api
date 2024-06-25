import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dtos/create-book.input';
import { UpdateBookInput } from './dtos/update-book.input';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entity/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly usersService: UsersService,
    private readonly authorsService: AuthorsService,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find({ relations: ['user', 'author'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['user', 'author'],
    });
    if (!book) throw new UserInputError('Book not found');
    return book;
  }

  async create({ title, authorId }: CreateBookInput): Promise<Book> {
    const author = await this.authorsService.findOne(authorId);
    const book = this.booksRepository.create({ title, author });
    return await this.booksRepository.save(book);
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    const book = await this.booksRepository.preload({
      id,
      ...updateBookInput,
    });
    if (!book) throw new UserInputError('Book not found.');
    return await this.booksRepository.save(book);
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);
    return this.booksRepository.remove(book);
  }

  async getUserBooks(id: number): Promise<Book[]> {
    return this.booksRepository.find({
      where: { user: { id } },
      relations: ['user', 'author'],
    });
  }

  async getAuthorBooks(id: number): Promise<Book[]> {
    return await this.booksRepository.find({
      where: { author: { id } },
      relations: ['user', 'author'],
    });
  }

  async getBookAuthor(id: number): Promise<Author> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return book.author;
  }

  async assignBookToAuthor(bookId: number, authorId: number): Promise<Book> {
    const author = await this.authorsService.findOne(authorId);
    const book = await this.findOne(bookId);

    if (!author || !book)
      throw new UserInputError('Author or Book is not found');

    book.author = author;
    return await this.booksRepository.save(book);
  }

  async assignBookToUser(bookId: number, userId: number): Promise<Book> {
    const user = await this.usersService.findOne(userId);
    const book = await this.findOne(bookId);

    if (!user || !book) throw new UserInputError('User or Book is not found');

    book.user = user;
    return await this.booksRepository.save(book);
  }
}
