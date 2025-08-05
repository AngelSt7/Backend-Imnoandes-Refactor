import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { format } from "src/common/utils/format";

@Schema({ timestamps: true })
export class Car {

    @Prop({ type: String, required: true })
    brand: string;

    @Prop({ type: String, required: true, unique: true })
    model: string;

    @Prop({ type: Number, required: true })
    year: number;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: String, required: true, enum: ['gasoline', 'diesel', 'electric', 'hybrid'] })
    fuelType: string;

    @Prop({ type: String, required: true })
    color: string;

    @Prop({ type: Number, required: true })
    doors: number;

    @Prop({ type: Number, required: true })
    seats: number;

    @Prop({ type: String, required: true, enum: ['manual', 'automatic'] })
    transmission: string;

    @Prop({ type: Number, required: true })
    mileage: number;

    @Prop({ type: String, required: true, enum: ['new', 'used'] })
    status: string;

    @Prop({ type: String, unique: true, index: true })
    slug: string;

    @Prop({type: Boolean, default: true, required: false})
    active: boolean

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    userId: Types.ObjectId
}

export type CarDocument = HydratedDocument<Car>;
export const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.pre<CarDocument>('save', function(next){
    this.slug = format(this.brand) + '-' + format(this.model) + '-' + format(this.year.toString())
    next()
})

// CarSchema.post<CarDocument>('findOneAndUpdate', function(next){
//     this.slug = format(this.brand) + '-' + format(this.model) + '-' + format(this.year.toString())
//     next()
// })