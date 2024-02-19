import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    private readonly usersService: UsersService,
  ) {}

  async create(createWishDto: CreateWishDto, userId: number): Promise<Wish> {
    const owner = await this.usersService.findById(userId);
    const wish = await this.wishRepository.create({ ...createWishDto, owner });

    return this.wishRepository.save(wish);
  }

  async findUserWishesById(ownerId: number) {
    return await this.wishRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['owner'],
    });
  }

  async getWishById(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: { offers: true, owner: true },
    });
    if (!wish) {
      throw new ServerException(ErrorCode.NotFoundWishes);
    }
    return wish;
  }

  //Поиск последних 40 подарков
  async lastWishes(): Promise<Wish[]> {
    return await this.wishRepository.find({
      take: 40,
      order: { createdAt: 'DESC' },
    });
  }

  //Поиск 20 популярных подарков
  async topWishes(): Promise<Wish[]> {
    return await this.wishRepository.find({
      take: 20,
      order: { copied: 'DESC' },
    });
  }

  //Удаление подарка
  async removeOne(wishId: number, userId: number) {
    const wish = await this.getWishById(wishId);

    if (userId !== wish.owner.id) {
      throw new ServerException(ErrorCode.ForbiddenNotOwner);
    }

    return await this.wishRepository.delete(wishId);
  }

  //Копирование подарка
  async copy(wishId: number, user: User) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });

    //Проверяем не является ли пользователь владельцем подарка
    if (user.id === wish.owner.id) {
      throw new ServerException(ErrorCode.ForbiddenOwnWish);
    }

    //Проверяем не скопирован ли уже подарок к себе. Для этого сначала подгружаем список подарков пользователя
    const userWishes = await this.usersService.findUserWishes(user.id);

    //Далее проверяем нет ли подарка с такой же ссылкой на его страницу на сайте продавца (по id подарка
    // никак не проверить, потому что он каждый раз новый создается. Либо надо переделать схему, чтобы
    // id сохранялся при копировании)
    const userHasWish = await userWishes.reduce(function (
      includeWish: boolean,
      item: Wish,
    ): boolean {
      if (item.link === wish.link) {
        includeWish = true;
      }
      return includeWish;
    }, false);

    if (userHasWish) {
      throw new ServerException(ErrorCode.ForbiddenAlreadyCopied);
    }

    const createWishDto: CreateWishDto = {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
    };

    await this.create(createWishDto, user.id);
    await this.wishRepository.increment({ id: wishId }, 'copied', 1);
  }

  //Обновление информации о набронной сумме
  async updateRaised(wishId: number, updateData: UpdateWishDto) {
    return await this.wishRepository.update(wishId, updateData);
  }

  //Изменение информации о подарке
  async editWish(wishId: number, user: User, updateWishDto: UpdateWishDto) {
    const wish = await this.getWishById(wishId);

    //Ошибка если не вледелец редактирует подарок
    if (user.id !== wish.owner.id) {
      throw new ServerException(ErrorCode.ForbiddenNotOwnWish);
    }

    //Ошибка если запрашивается изменение цены,а на подарок уже скинули деньги
    if (wish.raised && updateWishDto.price > 0) {
      throw new ServerException(ErrorCode.ForbiddenAlreadyOffered);
    }

    return await this.wishRepository.update(wishId, updateWishDto);
  }
}
