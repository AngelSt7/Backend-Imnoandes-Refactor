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

    public handleError(error: any, context: string) {
        const code = Number(error.code);
        this.logger.error(error);

        let field: string | null = null;

        if (code === 23505) {
            field = Object.keys(error.keyPattern)[0];
        }

        const fieldMessage = this.ErrorsMapping[context]?.[field];

        switch (code) {
            case 23505:
                throw new BadRequestException({
                    message: fieldMessage ?? 'Duplicate key error',
                    statusCode: 400,
                    error: 'Bad Request',
                });

            default:
                throw new InternalServerErrorException(error.message ?? 'Internal error');
        }
    }

}
