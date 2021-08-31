import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ConfirmEmail } from "../mail/confirm-email.model";
import {Post} from "../posts/posts.model";
import {UserFriends} from "./user-friends.model";


interface UserCreationAttrs {
  email: string
  password: string
  avatar?: string
  name: string
  surname: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({
      example: 'example@gmail.com',
      description: 'Электронный адрес пользователя',
      nullable: false,
      uniqueItems: true
    })
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @ApiProperty({
    example: 'dje2jcba5l3hgha5...',
    description: 'Захэшированный пароль пользователя',
    nullable: false,
  })
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  password: string

  @ApiProperty({
    // example: 'example@gmail.com',
    // description: 'Электронный адрес пользователя',
    nullable: true,
  })
  @Column({type: DataType.STRING, allowNull: true, defaultValue: 'unknown'})
  avatar: string

  @ApiProperty({
    example: 'Ярослав',
    description: 'Имя пользователя',
    nullable: false,
  })
  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @ApiProperty({
    example: 'Поляков',
    description: 'Фамилия пользователя',
    nullable: false,
  })
  @Column({type: DataType.STRING, allowNull: false})
  surname: string

  @ApiProperty({example:'False', description: 'Активирован ли аккаунт'})
  @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
  isActivated: boolean

  @HasOne(() => ConfirmEmail, {
    onDelete: 'CASCADE'
  })
  confirmLink: ConfirmEmail

  @HasMany(() => Post)
  posts: Post[]

  // @BelongsToMany(() => User, () => UserFriends)
  // friends: UserFriends[]
}