import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersService } from '../src/users/users.service';
import { AppModule } from '../src/app.module';
import { response } from 'express';

jest.setTimeout(100000);

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let service: UsersService;
  let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UsersService>(UsersService);

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  it('should create a user', async () => {
    const CreateUserDto = {
      name: 'john g',
      email: 'joohnn@gmail.com',
    };
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(CreateUserDto)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(CreateUserDto.name);
    expect(response.body.email).toBe(CreateUserDto.email);

    userId = response.body._id;
  });

  it('should update the user by id', async () => {
    expect(userId).toBeDefined();

    const UpdateUserDto = {
      name: 'Oli John',
      email: 'john12@gmail.com',
    };

    const response = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send(UpdateUserDto)
      .expect(200);

    expect(response.body.name).toBe(UpdateUserDto.name);
    expect(response.body.email).toBe(UpdateUserDto.email);
  });

  it('should get a list of users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200); // Expect HTTP status 200 (OK)

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve the user by id', async () => {
    expect(userId).toBeDefined();

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body._id).toBe(userId);
    expect(response.body.name).toBe('Oli John');
    expect(response.body.email).toBe('john12@gmail.com');
  });

  it('should delete the user', async () => {
    expect(userId).toBeDefined();

    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);
  });
});
