import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UseGuards } from '@nestjs/common/decorators/core';
import { JwtGuard } from 'src/auth/jwt.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { Wishlist } from './entities/wishlist.entity';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto, @AuthUser() user) {
    return await this.wishlistsService.create(user, createWishlistDto);
  }

  //Поиск всех коллекций
  @Get()
  async getAllWishlist(): Promise<Wishlist[]> {
    return await this.wishlistsService.getAllWishlists();
  }

  //Поиск коллекции по id
  @UseGuards(JwtGuard)
  @Get(':id')
  async findWishlistById(@Param('id') id: string) {
    return await this.wishlistsService.getWishlistById(+id);
  }

  //Удаление коллекции
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteWish(@Param('id') wishlistId: number, @AuthUser() user) {
    return await this.wishlistsService.removeOne(wishlistId, user.id);
  }

  //Изменение коллекции
  @UseGuards(JwtGuard)
  @Patch(':id')
  async editWish(
    @Param('id') wishId: number,
    @AuthUser() user: User,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return await this.wishlistsService.editWishlist(
      wishId,
      user,
      updateWishlistDto,
    );
  }
}
