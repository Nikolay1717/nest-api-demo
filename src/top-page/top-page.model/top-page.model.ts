import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export class HhData {
    @Prop()
    count: number;

    @Prop()
    junirSalary: number;

    @Prop()
    middleSalary: number;

    @Prop()
    seniorSalary: number;
}

export class TopPageAdvantage {
    @Prop()
    title: string;

    @Prop()
    description: string;
}

export type TopPageDocument = HydratedDocument<TopPage>;

@Schema({ timestamps: true })
export class TopPage {
    @Prop({ enum: TopLevelCategory })
    firstLevelCategory: TopLevelCategory;

    @Prop()
    secondCategory: string;

    @Prop({ unique: true })
    alias: string;

    @Prop({ text: true })
    title: string;

    @Prop()
    category: string;

    @Prop(HhData)
    hh?: HhData;

    @Prop([TopPageAdvantage])
    advantages: TopPageAdvantage[];

    @Prop()
    seoText: string;

    @Prop()
    tagsTitle: string;

    @Prop([String])
    tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
