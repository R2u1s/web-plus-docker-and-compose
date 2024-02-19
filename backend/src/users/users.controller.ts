import { Controller, Get, Body, Patch, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common/decorators/core';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  @Get('me')
  async findMe(@AuthUser() user: User): Promise<User> {
    return await this.usersService.findOwn({
      where: { id: user.id },
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Get('me/wishes')
  async findWishesById(@AuthUser() user: User): Promise<Wish[]> {
    return await this.wishesService.findUserWishesById(user.id);
  }

  @Patch('me')
  async update(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateById(user.id, updateUserDto);
  }

  @Post('find')
  async findMany(@Body('query') query: string): Promise<User[]> {
    const user = await this.usersService.findQuery(query);

    return user;
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    return user;
  }

  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string): Promise<Wish[]> {
    const user = await this.usersService.findByUsername(username);
    return this.usersService.findUserWishes(user.id);
  }
}
