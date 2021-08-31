import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class UserCreateDto {

  @ApiProperty({example: 'example@gmail.com', description: 'почтовый адрес'})
  @IsEmail({}, {message: 'Некорректный email'})
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({example: 'mypass4295', description: 'Пароль'})
  @IsString({message: 'должен быть строкой'})
  @Length(6, 30, { message: 'Не меньше 6 и не больше 30'})
  readonly password: string

  @ApiProperty({example: 'Ярослав', description: 'Имя пользователя'})
  @IsString({message: 'должно быть строкой'})
  @IsAlpha( 'ru-RU', {message: 'имя должно содержать только буквы кирилицы'})
  @Length(2, 50, { message: 'не меньше 2 символов'})
  readonly name: string

  @ApiProperty({example: 'Поляков', description: 'Фамилия пользователя'})
  @IsString({message: 'должно быть строкой'})
  @IsAlpha('ru-RU', {message: 'фамилия должна содержать только буквы кирилицы'})
  @Length(2, 50, { message: 'не меньше 2 символов'})
  readonly surname: string
}