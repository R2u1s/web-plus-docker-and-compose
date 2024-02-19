import { IsString, Length, IsUrl, IsArray, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  // поле name. Название списка
  @IsString()
  @Length(1, 250)
  name: string;

  // поле image. Ссылка на изображение обложки для подборки
  @IsUrl()
  image: string;

  @IsArray()
  @IsOptional()
  itemsId?: number[];
}
