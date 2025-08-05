import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, minlength: 3 })
    name: string

    @Prop({ type: String, minlength: 3 })
    lastName: string

    @Prop({ unique: true, required: true, index: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({type: Boolean, default: false})
    isActive: boolean
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);