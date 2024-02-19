import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { IsInt, IsString, Length, IsUrl } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  // поле id
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  // поле createdAt
  @CreateDateColumn()
  createdAt: Date;

  // поле updatedAt
  @UpdateDateColumn()
  updatedAt: Date;

  // поле name. Название списка
  @Column()
  @IsString()
  @Length(1, 250)
  name: string;

  /*   // поле description. Описание подборки
  @Column()
  @IsString()
  @IsOptional()
  @MaxLength(1500)
  description?: string; */

  // поле image. Ссылка на изображение обложки для подборки
  @Column()
  @IsUrl()
  image: string;

  // поле wishes. Список желаемых подарков
  @ManyToMany(() => Wish, (wish) => wish.name)
  @JoinTable()
  items: Wish[];

  // поле owner. Ссылка на владельца списка
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
