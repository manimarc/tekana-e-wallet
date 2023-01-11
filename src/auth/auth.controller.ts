import {
  Controller,
  Post,
  UseGuards,
  Res,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from 'src/users/current-user.decorator';
import { CreateUserDto } from 'src/users/dto/request/create-user.dto';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserResponse,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.login(user, response);
    response.send(user);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.authService.signUp(createUserDto);
    if (!user) {
      throw new HttpException(
        'User exist for the specified email!!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
