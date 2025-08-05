import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class HandleErrorsService {
  private logger = new Logger(HandleErrorsService.name);

  private readonly ErrorsMapping = {
    auth: {
      email: 'This email is already in use',
    },
    cars: {
      slug: 'The slug must be unique, please change model, year or brand',
    },
  };

  public handleError(error: any, context: string) : never {
    this.logger.error(error);

    if (error.code === 'P2002') {
      const fields = error.meta?.target as string[] | undefined;
      const field = fields?.[0] ?? 'unknown';

      const fieldMessage = this.ErrorsMapping[context]?.[field];

      throw new BadRequestException({
        message: fieldMessage ?? `Duplicate key error on field: ${field}`,
        statusCode: 400,
        error: 'Bad Request',
      });
    }

    throw new InternalServerErrorException(error.message ?? 'Internal error');
  }
}
