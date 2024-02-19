import { IsString, Length, IsUrl, IsNumber } from 'class-validator';

export class CreateWishDto {
  // поле name. Название подарка
  @IsString()
  @Length(1, 250)
  name: string;

  // поле link. Ссылка на интернет-магазин, где можно приобрести подарок
  @IsUrl()
  link: string;

  // поле image. Ссылка на изображение подарка
  @IsUrl()
  image: string;

  // поле price
  @IsNumber()
  price: number;

  // поле description. Описание подарка
  @IsString()
  @Length(1, 1024)
  description: string;
}
