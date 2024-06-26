import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'Заголовок',
    description: 'Тестовое описание',
    rating: 5,
    productId,
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/review/create (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('/review/create (POST) - fail', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send({ ...testDto, rating: 0 })
            .expect(400)
            .then(({ body }: request.Response) => {
                console.log(body);
            });
    });

    it('/review/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200);
    });

    afterAll(() => {
        disconnect();
    });
});
