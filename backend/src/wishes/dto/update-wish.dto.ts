import { PartialType } from '@nestjs/mapped-types';
import { CreateWishDto } from './create-wish.dto';
import { IsNumber, IsOptional, IsString, Length, IsUrl } from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  // поле name. Название подарка
  @IsString()
  @Length(1, 250)
  @IsOptional()
  name?: string;

  // поле link. Ссылка на интернет-магазин, где можно приобрести подарок
  @IsUrl()
  @IsOptional()
  link?: string;

  // поле image. Ссылка на изображение подарка
  @IsUrl()
  @IsOptional()
  image?: string;

  // поле price
  @IsNumber()
  @IsOptional()
  price?: number;

  // поле description. Описание подарка
  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  raised?: number;
}
