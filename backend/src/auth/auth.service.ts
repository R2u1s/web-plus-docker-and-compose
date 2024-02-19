import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { verifyHash } from 'src/helpers/hash';
import { ErrorCode } from 'src/exceptions/error-codes';
import { ServerException } from 'src/exceptions/server.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    /* В идеальном случае пароль обязательно должен быть захэширован */
    const verifyPassword = await verifyHash(password, user.password);

    if (!verifyPassword) {
      throw new ServerException(ErrorCode.Unauthorized);
    }

    if (user && verifyPassword) {
      /* Исключаем пароль из результата */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return user;
    }

    return null;
  }
}
