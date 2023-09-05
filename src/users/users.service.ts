import { Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,
    });
    return user;
  }
  async register(user: RegisterUserDto) {
    const { name, email, password, age, gender, address } = user;
    const hashPassword = this.getHashPassword(password);
    const newRegister = await this.userModel.create({
      name: name,
      email: email,
      password: hashPassword,
      age: age,
      gender: gender,
      address: address,
    });
    return newRegister;
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
  //check xem có đúng email không
  findOneByUsername(username: string) {
    return this.userModel.findOne({ email: username });
  }
  //check password nhập vào với hash password
  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
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
