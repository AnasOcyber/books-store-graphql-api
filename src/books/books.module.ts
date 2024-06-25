import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';
import { UsersModule } from 'src/users/users.module';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule, AuthorsModule],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
