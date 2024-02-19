import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { IsInt, Min, IsBoolean } from 'class-validator';

import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Offer {
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

  // поле User. Содержит id желающего скинуться
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  // поле item. Содержит ссылку на товар
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  // поле amount. Сумма заявки
  @Column({
    type: 'numeric',
    scale: 2,
  })
  amount: number;

  // поле hidden. Флаг, который определяет показывать ли информацию о скидывающемся в списке
  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  hidden: boolean;
}
