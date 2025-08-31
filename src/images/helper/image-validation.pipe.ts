import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as sharp from 'sharp';
import { configByType, UploadType } from '../config/upload.config';



@Injectable()
export class ImageValidationPipe implements PipeTransform {
  constructor(private readonly type: UploadType) {}

  async transform(files: Express.Multer.File[]): Promise<Express.Multer.File[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const config = configByType[this.type];
    
    // Validar cantidad de archivos
    if (files.length > config.maxCount) {
      throw new BadRequestException(`Maximum ${config.maxCount} files allowed for ${this.type}`);
    }

    // Validar cada archivo
    for (const file of files) {
      await this.validateFile(file, config);
    }

    return files;
  }
  private async validateFile(file: Express.Multer.File, config: typeof configByType[UploadType]) {
    // Validar tamaño
    const maxSizeBytes = config.maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new BadRequestException(`File ${file.originalname} exceeds ${config.maxSizeMB}MB limit`);
    }

    try {
      // Validar dimensiones
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
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Invalid image file: ${file.originalname}`);
    }
  }
}