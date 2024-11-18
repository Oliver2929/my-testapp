import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fowosereademola:1234@olicluster.c76hn.mongodb.net/?retryWrites=true&w=majority&appName=OliCluster',
    ),
    UsersModule,
  ],
})
export class AppModule {}
