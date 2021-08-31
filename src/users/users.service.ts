import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { UserCreateDto } from "./dto/user-create.dto";
import {UserFriends} from "./user-friends.model";
import {Op} from "sequelize";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              @InjectModel(UserFriends) private userFriendsRepository: typeof UserFriends) {
  }

  async createUser(dto: UserCreateDto) {
    const user = await this.userRepository.create(dto)
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}})
    return user
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}, include: {all: true}})
    return user
  }

  async activateUser() {}

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}, order: [['createdAt', 'DESC']]})
    return users
  }

  async deleteAllUsers() {
    const users = await this.userRepository.destroy({
      where: {},
    })
    return users
  }

  async getAllFriends() {
    const friends = await this.userFriendsRepository.findAll()

    return friends
  }

  async getUsersFriends(userId) {
    const user = await this.userRepository.findByPk(userId)
    if (!user) {
      throw new HttpException('Пользователи не найдены', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const friends = await this.userFriendsRepository.findAll({where: {
      [Op.or]: [
        {userF: user.id, isConfirmed: true},
        {userS: user.id, isConfirmed: true}
      ]
      }
    })
    const users = []
    for (let i = 0; i < friends.length; i++) {
      const user1 = await this.userRepository.findByPk(friends[i].userF)
      const user2 = await this.userRepository.findByPk(friends[i].userS)
      if (user.id !== user1.id) {users.push(user1)}
      if (user.id !== user2.id) {users.push(user2)}
      // if (user.id !== user1.id) {users.push(new UserDto(user1))}
      // if (user.id !== user2.id) {users.push(new UserDto(user2))}
    }
    return users
  }

  async getUsersRequests(userId) {
    const requests = await this.userFriendsRepository.findAll({where: {
      [Op.and]: [
        {userS: userId},
        {isConfirmed: false}
      ]
      }})
    const users = []
    for (let i = 0; i < requests.length; i++) {
      const user = await this.userRepository.findByPk(requests[i].userF)
      users.push(user)
    }
    // await this.userFriendsRepository.destroy({
    //   where: {},
    //   truncate: true
    // })
    return users
  }

  async createUserFriend(dto) {
    const user1 = await this.userRepository.findOne({where: {id: dto.userF}})
    const user2 = await this.userRepository.findOne({where: {id: dto.userS}})
    if (!user1 && !user2) {
      throw new HttpException('Пользователи не найдены', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const candidate1 = await this.userFriendsRepository.findOne({where: {
              [Op.and]: [{userF: user1.id}, {userS: user2.id}],}}
    )
    const candidate2 = await this.userFriendsRepository.findOne({where: {
        [Op.and]: [{userF: user2.id}, {userS: user1.id}],}}
    )
    if (candidate1 || candidate2) {
      throw new HttpException('Запрос уже отправлен', HttpStatus.CONFLICT)
    }
    const friendReq = await this.userFriendsRepository.create({userF: user1.id, userS: user2.id})

    return friendReq
  }

  async confirmFriend(dto) {
    const user1 = await this.userRepository.findOne({where: {id: dto.userF}})
    const user2 = await this.userRepository.findOne({where: {id: dto.userS}})
    if (!user1 && !user2) {
      throw new HttpException('Пользователи не найдены', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const friendRow = await this.userFriendsRepository.findOne({where: {userS: user2.id}})
    friendRow.isConfirmed = true
    await friendRow.save()
    console.log(friendRow)

    return friendRow
  }
}
