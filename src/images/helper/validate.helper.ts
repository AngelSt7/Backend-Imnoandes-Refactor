import { BadRequestException } from "@nestjs/common";

const errors = {
    size: 'The file size is too large, the maximum size is 1MB.',
    required: 'The file is required.',
    type: 'The file must be a PNG, JPEG or JPG.',
}

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if (!file) return callback(new BadRequestException(errors.required), false);
    if (!allowedTypes.includes(file.mimetype)) return callback(new BadRequestException(errors.type), false)
    if (file.size > 1 * 1024 * 1024) return callback(new BadRequestException(errors.size), false)
    callback(null, true);
};