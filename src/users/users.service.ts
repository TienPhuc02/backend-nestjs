import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(CreateUserDto: CreateUserDto) {
    // async create(email: string, password: string, name: string) {
    const hashPassword = this.getHashPassword(CreateUserDto.password);
    const user = await this.userModel.create({
      email: CreateUserDto.email,
      password: hashPassword,
      name: CreateUserDto.name,
    });
    return user;
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    return this.userModel.findOne({ _id: id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    const user = this.userModel.findOneAndUpdate(
      { _id: id },
      { email: updateUserDto.email, password: updateUserDto.password },
    );
    return user;
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id }, { isDeleted: true });
  }
}