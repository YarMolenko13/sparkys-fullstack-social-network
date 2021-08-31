import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";
import { User } from "../users.model";
import {Post} from "../../posts/posts.model";

export class UserDto {

  @ApiProperty({example: '312', description: 'Id ползователя'})
  readonly id: number

  @ApiProperty({example: 'example@gmail.com', description: 'Почтовый адрес'})
  readonly email: string

  @ApiProperty({example: 'Ярослав', description: 'Имя пользователя'})
  readonly name: string

  @ApiProperty({example: 'Поляков', description: 'Фамилия пользователя'})
  readonly surname: string


  readonly posts?: Post[]

  @ApiProperty({example: 'asdfgert3432.png', description: 'Имя фотографии профиля'})
  readonly avatar?: string


  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.surname = user.surname
    this.avatar = user.avatar
    this.posts = user.posts
  }
}