import { forwardRef, Module } from "@nestjs/common";
import { MailService } from './mail.service';
import { MailerModule } from "@nestjs-modules/mailer";
import { UsersModule } from "../users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { ConfirmEmail } from "./confirm-email.model";


@Module({
  imports: [
    forwardRef(() => UsersModule),
    MailerModule.forRoot({
      transport: {
        from: 'yaroslav.molodcov215@gmail.com',
        host: 'smtp.zoho.com',
        port: 465,
        auth: {
          user: 'yaroslav.molodcov215@gmail.com',
          pass: 'Liliy2014'
        }
      },
      defaults: {
        from: 'yaroslav.molodcov215@gmail.com',
      },
    }),
    SequelizeModule.forFeature([ConfirmEmail, User]),
  ],
  providers: [MailService],
  exports: [MailService],
})
// @ts-ignore
export class MailModule {}
