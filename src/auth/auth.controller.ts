import { Controller,  Post,  UseGuards, Res } from '@nestjs/common';
import {Response} from 'express';
import { CurrentUser } from 'src/users/current-user.decorator';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { Public } from './public.decorator';
import { Roles } from './role.decorator';
import { Role } from './role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()

@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user:UserResponse, 
  @Res({passthrough:true}) response:Response
  ):Promise<void>{
    await this.authService.login(user,response);
    response.send(user);
  }

 
}
