import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UserCreateDto } from "../users/dto/user-create.dto";
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from "../users/dto/user-login.dto";
import { User } from "../users/users.model";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/dto/user.dto";
import { MailService } from "../mail/mail.service";
import { Cloudinary } from "../cloudinary";


@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService,
              private mailService: MailService,
              private cloudinaryService: Cloudinary) {
  }

  async login(userDto: UserLoginDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    if (!user) {
      throw new HttpException('Неверный логин или пароль', HttpStatus.UNAUTHORIZED)
    }

    await this.validateUser(userDto, user)

    const token = await this.generateToken(user)
    return {
      user: new UserDto(user),
      token
    }
  }

  async registration(userDto: UserCreateDto, image) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.UNAUTHORIZED)
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({...userDto, password: hashedPassword})

    if (image) {
      const fileName = await this.cloudinaryService.uploadImage(image)
      user.avatar = fileName
      await user.save()
    }

    // const confirmEmail = await this.mailService.createConfirmEmail(user)
    // await this.mailService.sendUserConfirmEmail(user, confirmEmail.confirmToken)

    return user
  }

  async check(token) {
    const userPayload = this.validateToken(token.token)
    const user = await this.userService.getUserById(userPayload.id)
    if (!user) {
      throw new UnauthorizedException('Такого пользователя не существует')
    }
    const userDto = new UserDto(user)
    return userDto
  }

  async generateToken(user: User): Promise<string> {
    const payload ={email: user.email, id: user.id, name: user.name}
    return this.jwtService.sign(payload)
  }

  private validateToken(token: string) {
    try {
      const data = this.jwtService.verify(token)
      return data
    } catch (e) {
      throw new UnauthorizedException('Невалидный токен')
    }
  }

  private async validateUser(userDto: UserLoginDto, user: User) {
    const compareResult = await this.comparePasswords(userDto.password, user.password)
    if (!compareResult) {
      throw new HttpException('Неверный логин или пароль', HttpStatus.UNAUTHORIZED)
    }
    // if (!user.isActivated) {
    //   throw new HttpException('Email не активирован', HttpStatus.FORBIDDEN)
    // }
  }

  private async comparePasswords(password, hashedPassword) {
    const isPasswordsEquals = await bcrypt.compare(password, hashedPassword)
    if (!isPasswordsEquals) {
      return false
    }
    return true
  }

  // private async validateUser(userDto: UserLoginDto) {
  //   const user = await this.userService.getUserByEmail(userDto.email)
  //   if (!user) {
  //     return  new UnauthorizedException({message: 'Неверный email или пароль'})
  //   }
  //   if (!user.isActivated) {
  //     return  new UnauthorizedException({message: 'Email не активирован'})
  //   }
  //
  //   const isPasswordsEquals = await bcrypt.compare(userDto.password, user.password)
  //   if (!isPasswordsEquals) {
  //     throw new UnauthorizedException({message: 'Неверный email или пароль'})
  //   }
  //   return user
  // }
}
