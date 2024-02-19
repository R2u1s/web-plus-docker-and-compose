import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsUrl,
  IsEmail,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @Transform((params) => (params.value?.length > 0 ? params.value : undefined))
  @IsOptional()
  @Length(2, 200)
  about?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
