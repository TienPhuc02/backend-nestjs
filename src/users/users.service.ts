import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserM } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Company } from 'src/companies/schema/company.schema';
import { IUser } from './users.interface';
import { User } from 'src/decorator/customize';
// import { User } from 'src/decorator/customize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) private userModel: Model<UserM>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(createUserDto: CreateUserDto, @User() user: IUser) {
    const { name, email, password, gender, age, address, role, company } =
      createUserDto;
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email : ${email} đã tồn tại trên hệ thống vui lòng sử dụng Email khác`,
      );
    }
    const hashPassword = this.getHashPassword(password);
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role,
      company,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return newUser;
  }
  async register(user: RegisterUserDto) {
    //add logic check email
    const { name, email, password, age, gender, address } = user;
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email : ${email} đã tồn tại trên hệ thống vui lòng sử dụng Email khác`,
      );
    }
    const hashPassword = this.getHashPassword(password);
    const newRegister = await this.userModel.create({
      name: name,
      email: email,
      password: hashPassword,
      age: age,
      gender: gender,
      address: address,
      role: 'USER',
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
  async updateUser(updateUserDto: UpdateUserDto, user: IUser) {
    const userUpdated = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return userUpdated;
  }
  remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id }, { isDeleted: true });
  }
}
