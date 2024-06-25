import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorInput } from './dtos/create-author.input';
import { UpdateAuthorInput } from './dtos/update-author.input';
import { Author } from './entity/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async findAll() {
    return await this.authorsRepository.find({ relations: ['books'] });
  }
  async findOne(id: number) {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) throw new UserInputError('Author not found');
    return author;
  }

  async create(createAuthorInput: CreateAuthorInput) {
    const author = this.authorsRepository.create(createAuthorInput);
    return await this.authorsRepository.save(author);
  }

  async update(id: number, updateAuthorInput: UpdateAuthorInput) {
    const author = await this.authorsRepository.preload({
      id,
      ...updateAuthorInput,
    });
    if (!author) throw new UserInputError('Author not found');
    return await this.authorsRepository.save(author);
  }

  async remove(id: number) {
    const author = await this.findOne(id);
    return await this.authorsRepository.remove(author);
  }
}
