import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { MailModule } from "../mail/mail.module";
import { AppModule } from "../app.module";
import { AuthGuard } from "./auth.guard";

@Module({
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  imports: [
    forwardRef(() => MailModule),
    forwardRef(() => AppModule),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret',
      signOptions: {
        expiresIn: '2d'
      }
    })
  ],
  exports: [
    JwtModule,
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {}
