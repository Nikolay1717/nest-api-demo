import {
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page.model/top-page.model';
import { Type } from 'class-transformer';

export class HhDataDto {
    @IsNumber()
    count: number;

    @IsNumber()
    junirSalary: number;

    @IsNumber()
    middleSalary: number;

    @IsNumber()
    seniorSalary: number;
}

export class TopPageAdvantageDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class CreateTopPageDto {
    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;

    @IsString()
    secondCategory: string;

    @IsString()
    alias: string;

    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsOptional()
    @Type(() => HhDataDto)
    hh?: HhDataDto;

    @IsArray()
    @ValidateNested()
    @Type(() => TopPageAdvantageDto)
    advantages: TopPageAdvantageDto[];

    @IsString()
    seoText: string;

    @IsString()
    tagsTitle: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];
}
