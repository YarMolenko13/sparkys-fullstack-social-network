import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {
  }

  // пропускает только с валиндым access token
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const auth = req.headers.authorization
      const bearer = auth.split(' ')[0]
      const token = auth.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(({message: 'Пользователь не авторизован'}))
      }

      const user = this.jwtService.verify(token)
      req.user = user
      return true
    } catch (e) {
      throw new UnauthorizedException(({message: 'Пользователь не авторизован'}))
    }
  }
}