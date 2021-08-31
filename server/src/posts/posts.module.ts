import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {User} from "../users/users.model";
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import {AppModule} from "../app.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => AuthModule),
      forwardRef(() => AppModule),
      SequelizeModule.forFeature([Post, User])
  ]
})
export class PostsModule {}
