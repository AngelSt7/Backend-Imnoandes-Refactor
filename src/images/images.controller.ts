import { BadRequestException, Controller, Delete, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { fileFilter } from './helper/validate.helper';
import { ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { Documentation } from '@decorators/doc/base/documentation.decorator';
import { IMAGE_REMOVE_RESPONSE, IMAGE_UPLOAD_RESPONSE } from './utils/image-doc.responses';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import { ResponseCreateImageDto } from './dto/response/response-create-image.dto';
import { ResponseRemoveImageDto } from './dto/response/response-remove-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter,
      limits: { fileSize: 1 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @Documentation({ summary: 'Upload images',
    type: ResponseDto(ResponseCreateImageDto, 'Images uploaded successfully'),
    responses: IMAGE_UPLOAD_RESPONSE
  })
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0)
      throw new BadRequestException('All uploaded images were invalid or missing.');
    return this.imagesService.create(files);
  }

  @Delete(':publicId')
  @Documentation({ type: ResponseRemoveImageDto, summary: 'Delete image', responses: IMAGE_REMOVE_RESPONSE })
  @ApiParam({ name: 'publicId', required: true })
  remove(@Param('publicId') publicId: string) {
    return this.imagesService.remove(publicId);
  }
}
