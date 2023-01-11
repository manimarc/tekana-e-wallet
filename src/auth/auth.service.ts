import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/request/create-user.dto';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { hash } from 'bcrypt';

export interface TokenPayload {
  userId: string;
  roles: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}
  async login(user: UserResponse, response: Response): Promise<void> {
    const tokenPayload: TokenPayload = {
      userId: user._id,
      roles: user.role,
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getDate() + this.configService.get('JWT_EXPIRATION_TIME'),
    );

    const token = this.jwtService.sign(tokenPayload);
    await this.usersRepository.updateUser(user._id, { last_login: new Date() });
    response.cookie('Authentication', token, { httpOnly: true, expires });
  }

  async signUp(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const isUserExist = await this.usersRepository.findUserByEmail(
        createUserDto.email,
      );
      if (isUserExist) {
        return;
      }
      const user = await this.usersRepository.insertOne({
        ...createUserDto,
        createdAt: new Date(),
        password: await hash(createUserDto.password, 10),
      });
      return this.buildResponse(user);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  private async buildResponse(user: User): Promise<UserResponse> {
    return await {
      _id: user._id.toHexString(),
      email: user.email,
      names: user.names,
      phone: user.phone,
      role: user.role,
      status: user.status,
    };
  }
}
