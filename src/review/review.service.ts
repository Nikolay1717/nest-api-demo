import { Injectable } from '@nestjs/common';
import { ReviewDocument, Review } from './review.model/review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name)
        private readonly reviewModel: Model<ReviewDocument>,
    ) {}

    async create(dto: CreateReviewDto): Promise<ReviewDocument> {
        const res = new this.reviewModel(dto);
        return res.save();
    }

    async delete(id: string): Promise<ReviewDocument> | null {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<ReviewDocument[]> {
        return this.reviewModel
            .find({ productId: new Types.ObjectId(productId) })
            .exec();
    }

    async deleteByProductId(productId: string): Promise<DeleteResult> {
        return this.reviewModel
            .deleteMany({ productId: new Types.ObjectId(productId) })
            .exec();
    }
}
