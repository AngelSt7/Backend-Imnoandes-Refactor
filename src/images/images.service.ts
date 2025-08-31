import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { ValidationsService } from './services/validations/validations.service';
import { UploadType } from './config/upload.config';

@Injectable()
export class ImagesService {
  private Logger = new Logger(ImagesService.name);
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly validationsService: ValidationsService
  ) { }

  async create(files: Express.Multer.File[], type: UploadType) {
        this.Logger.debug("Estamos en el service");


    await this.validationsService.validateFiles(files, type);

    try {
      this.Logger.log("intentado subir las imagenes");
      const uploadResults = await Promise.all(
        files.map(file =>
          this.cloudinaryService.uploadImage(file.buffer) as Promise<{ secure_url: string, public_id: string }>
        )
      );

      const data = uploadResults.map(result => ({ url: result.secure_url, publicId: result.public_id }));

      return {
        message: 'Images uploaded successfully',
        urls: data.map(image => image.url)
      };

    } catch (error) {
      this.Logger.log("error", error);
      throw new BadRequestException(error.message);
    }
  }

  async remove(publicId: string) {
    try {
      await this.cloudinaryService.removeImage(publicId);
      return {
        message: 'Image removed successfully',
      };
    } catch (error) {
      throw new BadRequestException('Error uploading image: ' + error.message);
    }
  }

}
