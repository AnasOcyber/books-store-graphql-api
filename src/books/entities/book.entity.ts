import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/entity/author.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  title: string;

  @Column({ default: Date.now().toString() })
  publishedDate: string;

  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: Author;
}
