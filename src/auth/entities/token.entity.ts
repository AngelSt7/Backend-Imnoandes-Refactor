import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class Token {
    @Prop({ type: String, required: true })
    token: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string

    @Prop({ type: Date, default: () => new Date(), expires: 600 })
    createdAt: Date;
}

export type TokeDocument = HydratedDocument<Token>
export const TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });