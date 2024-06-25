import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { nullable: true })
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  getUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { nullable: true })
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User, { nullable: true })
  updateUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, { nullable: true })
  deleteUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.remove(id);
  }
}
