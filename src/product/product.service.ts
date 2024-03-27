import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model/product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Review } from 'src/review/review.model/review.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
    ) {}

    async create(dto: CreateProductDto) {
        return new this.productModel(dto).save();
    }

    async findById(id: string) {
        return this.productModel.findById(id).exec();
    }

    async deleteById(id: string) {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }

    async findWithReviews(dto: FindProductDto) {
        const res = await this.productModel
            .aggregate([
                {
                    $match: {
                        categories: dto.category,
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
                {
                    $limit: dto.limit,
                },
                {
                    $lookup: {
                        from: 'Review',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'reviews',
                    },
                },
                {
                    $addFields: {
                        reviewCount: { $size: '$reviews' },
                        reviewAvg: { $avg: '$reviews.rating' },
                        reviews: {
                            $function: {
                                body: `function (reviews) {
                                    reviews.sort((a, b) => (
                                        new Date(b.createdAt) -
                                        new Date(a.createdAt)
                                    ));
                                    return reviews;
                                }`,
                                args: ['$reviews'],
                                lang: 'js',
                            },
                        },
                    },
                },
            ])
            .exec();
        return res as (Product & {
            review: Review[];
            reviewCount: number;
            reviewAvg: number;
        })[];
    }
}
