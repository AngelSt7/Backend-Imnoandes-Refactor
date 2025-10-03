import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as sharp from 'sharp';
import { configByType, UploadType } from '@/modules/images/config';

@Injectable()
export class ValidationsService {
    private readonly logger = new Logger(ValidationsService.name);

    async validateFiles(files: Express.Multer.File[], type: UploadType) {
        if (!files || files.length === 0) throw new BadRequestException('No files uploaded');

        const config = configByType[type];
        if (files.length > config.maxCount) {
            throw new BadRequestException(`Maximum ${config.maxCount} files allowed for ${type}`);
        }

        for (const file of files) {
            await this.validateFile(file, config);
        }
    }

    private async validateFile(file: Express.Multer.File, config: typeof configByType[UploadType]) {
        const maxSizeBytes = config.maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
            throw new BadRequestException(`File ${file.originalname} exceeds ${config.maxSizeMB}MB limit`);
        }

        try {
            const metadata = await sharp(file.buffer).metadata();
            const { width, height } = metadata;

            if (!width || !height) {
                throw new BadRequestException(`Unable to read dimensions from ${file.originalname}`);
            }

            if (width < config.minWidth || height < config.minHeight) {
                throw new BadRequestException(
                    `Image ${file.originalname} is too small. Minimum: ${config.minWidth}x${config.minHeight}`
                );
            }

            if (width > config.maxWidth || height > config.maxHeight) {
                throw new BadRequestException(
                    `Image ${file.originalname} is too large. Maximum: ${config.maxWidth}x${config.maxHeight}`
                );
            }
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            this.logger.error(`Error validating ${file.originalname}: ${error.message}`);
            throw new BadRequestException(`Invalid image file: ${file.originalname}`);
        }
    }
}
