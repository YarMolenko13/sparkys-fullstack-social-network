import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";


export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    const auth = req.headers.authorization
    if (auth === undefined) {
      throw new UnauthorizedException('Пользователь не авторизован')
    }
    const bearer = auth.split(' ')[0]
    const token = auth.split(' ')[1]
    if (!bearer || !token) {
      throw new UnauthorizedException('Пользователь не авторизован')
    }
    return {token}
  }
)