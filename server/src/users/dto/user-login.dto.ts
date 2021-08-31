import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class UserLoginDto {

  readonly email: string

  readonly password: string

}