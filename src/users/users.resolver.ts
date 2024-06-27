import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { nullable: true })
  @UseGuards(GqlAuthGuard)
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.remove(id);
  }
}
