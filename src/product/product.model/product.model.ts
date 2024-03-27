import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class ProductCharacteristic {
    @Prop()
    name: string;

    @Prop()
    value: string;
}

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @Prop()
    image: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    oldPrice?: number;

    @Prop()
    credit: number;

    @Prop()
    description: string;

    @Prop()
    advantages: string;

    @Prop()
    disAdvantages: string;

    @Prop([String])
    categories: string[];

    @Prop([String])
    tags: string[];

    @Prop([ProductCharacteristic])
    characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
