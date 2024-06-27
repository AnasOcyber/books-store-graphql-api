import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { genSalt } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserById(id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) return user;
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(name: string, email: string, password: string): Promise<User> {
    const salt = await genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
