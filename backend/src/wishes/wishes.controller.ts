import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common/decorators/core';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  //Поиск последних 40 подарков
  @Get('last')
  async findLastWishes(): Promise<Wish[]> {
    return await this.wishesService.lastWishes();
  }

  //Поиск 20 популярных подарков
  @Get('top')
  async findTopWishes(): Promise<Wish[]> {
    return await this.wishesService.topWishes();
  }

  //Создание подарка
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() сreateWishDto: CreateWishDto, @AuthUser() user) {
    return await this.wishesService.create(сreateWishDto, user.id);
  }

  //Поиск подарка по id
  @UseGuards(JwtGuard)
  @Get(':id')
  async findWish(@Param('id') id: string) {
    return await this.wishesService.getWishById(+id);
  }

  //Удаление подарка
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteWish(@Param('id') wishId: number, @AuthUser() user: User) {
    return await this.wishesService.removeOne(wishId, user.id);
  }

  //Копирование подарка к себе
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Param('id') wishId: number, @AuthUser() user) {
    return await this.wishesService.copy(wishId, user);
  }

  //Изменение подарка
  @UseGuards(JwtGuard)
  @Patch(':id')
  async editWish(
    @Param('id') wishId: number,
    @AuthUser() user: User,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return await this.wishesService.editWish(wishId, user, updateWishDto);
  }
}
