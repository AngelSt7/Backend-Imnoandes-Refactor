import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './entities/image.entity';
import { CloudinaryService } from './services/cloudinary.service';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {

  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: Model<Image>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async create(files: Express.Multer.File[]) {
    try {
      const uploadResults = await Promise.all(
        files.map(file =>
          this.cloudinaryService.uploadImage(file.buffer, {
            width: 500,
            height: 600,
          }) as Promise<{ secure_url: string, public_id: string }>
        )
      );

      const data = uploadResults.map(result => ({ url: result.secure_url, publicId: result.public_id }));
      await this.imageModel.insertMany(data);

      return {
        message: 'Images uploaded successfully',
        urls: data.map(image => image.url)
      };
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new BadRequestException(error.message);
    }
  }

  async remove(publicId: string) {
    try {
      await this.cloudinaryService.removeImage(publicId);
      await this.imageModel.deleteOne({ publicId });
      return {
        message: 'Image removed successfully',
      };
    } catch (error) {
      throw new BadRequestException('Error uploading image: ' + error.message);
    }
  }

}
