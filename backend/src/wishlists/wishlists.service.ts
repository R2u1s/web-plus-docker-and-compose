import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly wishesService: WishesService,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(
    user: User,
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const { itemsId } = createWishlistDto;

    const wishesArray = itemsId.map((id) => {
      return this.wishesService.getWishById(id);
    });

    const wishes = await Promise.all(wishesArray).then((items) => {
      return items;
    });

    const wishlist = await this.wishlistRepository.create({
      ...createWishlistDto,
      owner: user,
      items: wishes,
    });

    return this.wishlistRepository.save(wishlist);
  }

  async getAllWishlists() {
    return await this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });
  }

  async getWishlistById(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (!wishlist) {
      throw new ServerException(ErrorCode.NotFoundWishlist);
    }
    return wishlist;
  }

  //Удаление коллекции
  async removeOne(wishlistId: number, userId: number) {
    const wishlist = await this.getWishlistById(wishlistId);

    if (userId !== wishlist.owner.id) {
      throw new ServerException(ErrorCode.ForbiddenNotOwner);
    }

    return await this.wishlistRepository.delete(wishlistId);
  }

  //Изменение информации о коллекции
  async editWishlist(
    wishlistId: number,
    user: User,
    updateWishDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.getWishlistById(wishlistId);

    //Ошибка если не вледелец редактирует коллекцию
    if (user.id !== wishlist.owner.id) {
      throw new ServerException(ErrorCode.ForbiddenNotOwnWishlist);
    }

    return await this.wishlistRepository.update(wishlistId, updateWishDto);
  }
}
