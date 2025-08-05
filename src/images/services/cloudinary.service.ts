import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { envs } from 'src/config';
import { Readable } from 'stream';

interface Dimensions {
  width?: number;
  height?: number;
}

@Injectable()
export class CloudinaryService {
  private readonly folder = 'images';

  constructor() {
    cloudinary.config({
      cloud_name: envs.cloudinaryCloudName,
      api_key: envs.cloudinaryApiKey,
      api_secret: envs.cloudinaryApiSecret,
    });
  }

  async uploadImage(buffer: Buffer, dimensions: Dimensions) {
    return new Promise((resolve, reject) => {
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: this.folder,
          transformation: [
            { quality: "auto", fetch_format: "auto" },
            {
              width: dimensions.width,
              height: dimensions.height,
              crop: "fill",
              gravity: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        }
      );

      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  async removeImage(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

}
