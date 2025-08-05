import { v4 as uuid } from "uuid";
import { BadRequestException } from "@nestjs/common";

const errors = {
    required: 'The file is required.',
}
    
export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if (!file) return callback(new BadRequestException(errors.required), false);
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${uuid()}.${fileExtension}`;
    callback(null, fileName);
};