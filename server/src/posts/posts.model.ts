import {BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ConfirmEmail } from "../mail/confirm-email.model";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    heading: string
    content?: string
    photos?: string
    authorId: number
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs>{

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({
        description: 'Заголовок поста',
        nullable: false,
    })
    @Column({type: DataType.STRING, allowNull: false})
    heading: string

    @ApiProperty({
        description: 'Содержание поста',
    })
    @Column({type: DataType.TEXT})
    content: string

    @ApiProperty({
        nullable: true,
    })
    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    likes: number

    @ApiProperty({
        example: 'img2.png,img.jpg',
        nullable: true,
    })
    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    photos: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    authorId: number

    @BelongsTo(() => User)
    author: User
}