import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() { name, email, password }: SignupDto,
  ): Promise<{ user: User; token: string }> {
    const user = await this.authService.signup(name, email, password);
    const token = await this.authService.login(user);
    return { user, token: token.accessToken };
  }

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
  ): Promise<{ user: User; token: string }> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const token = await this.authService.login(user);
    return { user, token: token.accessToken };
  }
}
