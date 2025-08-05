import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Image {

    @Prop({ type: String, required: true })
    publicId: string

    @Prop({ type: String, required: true })
    url: string
}

export type ImageDocument = HydratedDocument<Image>;
export const ImageSchema = SchemaFactory.createForClass(Image);