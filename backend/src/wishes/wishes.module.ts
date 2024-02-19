import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Wish } from './entities/wish.entity';
import { Offer } from '../offers/entities/offer.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish, Offer]), UsersModule],
  controllers: [WishesController],
  providers: [WishesService, UsersService],
  exports: [WishesService],
})
export class WishesModule {}
