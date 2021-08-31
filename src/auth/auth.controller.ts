import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Redirect, Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserCreateDto } from "../users/dto/user-create.dto";
import { UserLoginDto } from "../users/dto/user-login.dto";
import { UserDto } from "../users/dto/user.dto";
import { MailService } from "../mail/mail.service";
import { REDIRECT_URL_AFTER_CONFIRMATION } from "../main";
import { FileInterceptor } from "@nestjs/platform-express";
import { Token } from "./token.decorator";

class LoginSucResponse {
  @ApiProperty({example: UserDto, description: 'Данные пользователя'})
  user: UserDto
  @ApiProperty({example: 'e42dyicbejke6,mn464ife4te', description: 'Access token'})
  token: string
}

@Controller('/api/auth')
export class AuthController {

  constructor(private authService: AuthService,
              private mailService: MailService) {
  }

  @ApiOperation({summary: 'Логин пользователя'})
  @ApiResponse({status: 200, type:  LoginSucResponse})
  @ApiResponse({status: 401, type: 'Неверные данные'})
  @ApiResponse({status: 403, type: 'Email не активирован'})
  @Post(`/login`)
  login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: 'Регистрация пользователя'})
  @ApiResponse({status: 200, type: User})
  @ApiResponse({status: 401, type: 'Пользователь с таки email уже существует'})
  @ApiResponse({status: 422, type: 'Ошибка валидации'})
  @UseInterceptors(FileInterceptor('image'))
  @Post(`/registration`)
  registration(@Body() userDto: UserCreateDto,
               @UploadedFile() image) {
    return this.authService.registration(userDto, image)
  }

  @ApiOperation({summary: 'Регистрация пользователя без аватарки'})
  @ApiResponse({status: 200, type: UserDto})
  @ApiResponse({status: 401, type: 'Пользователь с таки email уже существует'})
  @ApiResponse({status: 422, type: 'Ошибка валидации'})
  @Post(`/registration/no-avatar`)
  @UseInterceptors(FileInterceptor(''))
  registrationNoAvatar(@Body() userDto: UserCreateDto) {
    return this.authService.registration(userDto, null)
  }

  @ApiOperation({summary: 'Проверка пользователя'})
  @ApiResponse({status: 200, type: UserDto})
  @ApiResponse({status: 401, description: 'Невалидный токен'})
  @Get(`/check`)
  check(@Token() token: any) {
    return this.authService.check(token)
  }

  @ApiOperation({summary: 'Подтверждение имейла пользователя'})
  @ApiResponse({status: 422, type: 'Неверные данные'})
  @Get('confirm/:userId/')
  // @Redirect(REDIRECT_URL_AFTER_CONFIRMATION)
  confirmEmail(@Param('userId') userId: number,
               @Query() params,
               @Res() res) {
    this.mailService.confirmEmail(userId, params.confirmToken).then(r => {
      return res.redirect(REDIRECT_URL_AFTER_CONFIRMATION);
    } )
    // return res.redirect(REDIRECT_URL_AFTER_CONFIRMATION)
  }
}
