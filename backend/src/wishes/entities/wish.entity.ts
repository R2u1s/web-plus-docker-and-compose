import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsInt, IsString, Min, Length, IsUrl } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
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

  // поле name. Название подарка
  @Column()
  @IsString()
  @Length(1, 250)
  name: string;

  // поле link. Ссылка на интернет-магазин, где можно приобрести подарок
  @Column()
  @IsUrl()
  link: string;

  // поле image. Ссылка на изображение подарка
  @Column()
  @IsUrl()
  image: string;

  // поле price
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // поле raised. Сумма предварительного сбор или сумма, которые пользователи сейчас готовы скинуть на подарок
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  raised: number;

  // поле owner. Ссылка на пользователя, который добавил пожелание подарка
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  // поле description. Описание подарка
  @Column()
  @IsString()
  @Length(1, 1024)
  description: string;

  // поле offers. Массив ссылок на заявки скинуться от других пользователей
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  // поле copied. Содержит счетчик тех, кто скопировал подарок себе
  @Column({
    default: 0,
  })
  @IsInt()
  copied: number;
}
