import { HttpException, HttpStatus } from "@nestjs/common";


export class ValidationException extends HttpException {
  message

  constructor(response) {
    super(response, HttpStatus.UNPROCESSABLE_ENTITY);
    this.message = response
  }
}