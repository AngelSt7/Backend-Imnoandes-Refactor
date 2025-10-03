
import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { envs } from '@/config';
import { Readable } from 'stream';


@Injectable()
export class CloudinaryService {
  private readonly folder = 'images';
  private logger = new Logger(CloudinaryService.name);

  constructor() {
    cloudinary.config({
      cloud_name: envs.cloudinaryCloudName,
      api_key: envs.cloudinaryApiKey,
      api_secret: envs.cloudinaryApiSecret,
    });
  }

  async uploadImage(buffer: Buffer) {
    return new Promise((resolve, reject) => {
      this.logger.log("esn el upload image de cloudinary");

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: this.folder,
          transformation: [
            { quality: "auto", fetch_format: "auto" }
          ]
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      this.logger.log("Buffer length:", buffer.length);

      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  async removeImages(publicIds: string[]) {
    return Promise.all(
      publicIds.map(
        (publicId) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
              if (error) return reject(error);
              resolve({ publicId, result });
            });
          }),
      ),
    );
  }

}
