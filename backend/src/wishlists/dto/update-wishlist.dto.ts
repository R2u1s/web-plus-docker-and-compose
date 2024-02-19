import { PartialType } from '@nestjs/mapped-types';
import { CreateWishlistDto } from './create-wishlist.dto';
import { IsString, Length, IsUrl, IsArray, IsOptional } from 'class-validator';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {
  // поле name. Название списка
  @IsString()
  @Length(1, 250)
  @IsOptional()
  name?: string;

  // поле image. Ссылка на изображение обложки для подборки
  @IsUrl()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  itemsId?: number[];
}
