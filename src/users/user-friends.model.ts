import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./users.model";

interface UserFriendsCreationAttrs {
    userF: number,
    userS: number,
}

@Table({tableName: 'user_friends'})
export class UserFriends extends Model<UserFriends, UserFriendsCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    // @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userF: number

    // @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userS: number

    @Column({type: DataType.BOOLEAN, defaultValue: false })
    isConfirmed: boolean
}