import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];
}
