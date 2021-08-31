import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { ConfirmEmail } from "../mail/confirm-email.model";
import { AuthModule } from "../auth/auth.module";
import {UserFriends} from "./user-friends.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, ConfirmEmail, UserFriends]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
