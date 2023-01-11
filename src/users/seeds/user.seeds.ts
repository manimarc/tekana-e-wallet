import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { hash } from 'bcrypt';
import { UserRole, UserStatus } from 'src/common';
import { Command } from 'nestjs-command';

@Injectable()
export class UserSeed {
  constructor(private readonly usersRepository: UsersRepository) {}
  @Command({ command: 'create:user', describe: 'create a user' })
  async create() {
    const isUserExit = await this.usersRepository.findUserByEmail(
      'josiane@rssb.rw',
    );
    if (isUserExit) {
      console.log({ email: isUserExit.email, password: 'rssb123' });
    } else {
      const user = await this.usersRepository.insertOne({
        names: 'UWASE Josiane',

        email: 'josiane@rssb.rw',

        password: await hash('rssb123', 10),

        phone: '250782199875',
        role: UserRole.Admin,
        createdAt: new Date(),
        status: UserStatus.OPEN,
        createdBy: 'seeder',
      });
      console.log({
        email: user.email,
        password: 'rssb123',
        role: user.role,
        createdAt: user.createdAt,
        status: user.status,
      });
    }
  }
}
