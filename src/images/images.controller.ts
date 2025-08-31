import { Controller, Delete, Logger, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { UploadType } from './config/upload.config';
import { ValidateTypePipe } from './pipes/validate-type/validate-type.pipe';

@Controller('images')
export class ImagesController {
  private Logger = new Logger(ImagesController.name)
  constructor(
    private readonly imagesService: ImagesService
  ) { }

  @Post('/create/:type')
  @UseInterceptors(FilesInterceptor('images', 10))
  async upload(
    @Param('type', ValidateTypePipe) type: UploadType,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    this.Logger.log("Entrando al controllador y llegando al service");
    return this.imagesService.create(files, type);
  }


  @Delete(':publicId')
  remove(@Param('publicId') publicId: string) {
    return this.imagesService.remove(publicId);
  }
}
