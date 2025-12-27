import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch(BadRequestException)
export class HttpException implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;

    const exceptionResponse: any = exception.getResponse();

    let message: string | string[] = exceptionResponse.message;

    if (Array.isArray(message)) {
      message = message[0];
    }

    if (
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).message
    ) {
      message = (exceptionResponse as any).message;
    }

    response.status(status).json({
      statusCode: status,
      errors: message,
    });
  }
}
