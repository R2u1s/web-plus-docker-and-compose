import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  IsInt,
  IsString,
  Min,
  IsNotEmpty,
  Length,
  IsUrl,
  IsEmail,
} from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  // поле id
  @IsInt()
  @Min(0)
  @PrimaryGeneratedColumn()
  id: number;

  // поле createdAt
  @CreateDateColumn()
  createdAt: Date;

  // поле updatedAt
  @UpdateDateColumn()
  updatedAt: Date;

  // поле username
  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  // поле about
  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @IsString()
  @Length(2, 200)
  about: string;

  // поле avatar
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  // поле email
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  // поле password
  @Column()
  @IsString()
  password: string;

  // поле wishes. Список желаемых подарков
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  // поле offers. Список подарков, на которые скидывается пользователь
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  // поле wishlists. Список вишлистов, которые создал пользователь
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
