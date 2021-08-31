import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface ConfirmEmailCreationAttrs {
  confirmToken: string,
}

@Table({tableName: 'confirm_email'})
export class ConfirmEmail extends Model<ConfirmEmail, ConfirmEmailCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number


  @Column({type: DataType.STRING, unique: true, allowNull: false})
  confirmToken: string

  @ForeignKey(() => User)
  // @BelongsTo(() => User)
  user: User
}