import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  // có 1 biến userModel này là ngữ cảnh để thao tác với cơ sở dữ liệu MongoDB.
  //userModel, bạn có thể gọi các phương thức Mongoose như create, find, findOne, updateOne, deleteOne,... để tương tác với dữ liệu.
  //nhờ có phần decorator @InjectModel(User.name)  -> kết nối với userSchema và biến userModel ứng với model nào
  //kiểu giá trị là Model của mongoose
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(email: string, password: string, name: string) {
    const hashPassword = this.getHashPassword(password);
    const user = await this.userModel.create({
      email,
      password: hashPassword,
      name,
    });
    return user;
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
//plain text(text thường) -> hash text(mã hóa)
