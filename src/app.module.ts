import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfirmEmail } from "./mail/confirm-email.model";;
import { Cloudinary } from './cloudinary';
import * as path from 'path'
import { ServeStaticModule } from "@nestjs/serve-static";
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import {UserFriends} from "./users/user-friends.model";


// @ts-ignore
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      // host: process.env.DB_HOST,
      // port: 5432,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      host: 'chunee.db.elephantsql.com',
      port: 5432,
      username: 'qjotvijq',
      password: 'LystoVHoVhl5mveUT0YfR1t_1QOiv97H',
      database: 'qjotvijq',
      autoLoadModels: true,
      models: [User, ConfirmEmail, Post, UserFriends]
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    AuthModule,
    MailModule,
    PostsModule
  ],
  controllers: [],
  providers: [Cloudinary],
  exports: [Cloudinary]
})
// @ts-ignore
export class AppModule {}