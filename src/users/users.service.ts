import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //Create a new user
  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  //Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  //Get a user by ID

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
