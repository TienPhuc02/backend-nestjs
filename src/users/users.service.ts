import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User as UserM } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Company } from 'src/companies/schema/company.schema';
import { IUser } from './users.interface';
import { User } from 'src/decorator/customize';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
// import { User } from 'src/decorator/customize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

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

  //project practice
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
  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `not found user`;
    }
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.userModel.softDelete({ _id: id });
  }
  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    return await this.userModel.findOne({ _id: id }).select('-password');
  }
  async findAll(current: string, pageSize: string, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize; // bỏ qua current và pageSize để lấy full item trước đã rồi lọc
    const offset: number = (+current - 1) * +pageSize; // bỏ qua bao nhiêu phần tử
    const defaultLimit: number = +pageSize ? +pageSize : 10; //lấy ra số phần tử trong 1 trang
    const totalItems = (await this.userModel.find(filter)).length; // lấy ra tổng số lượng của tất cả các phần tử
    const totalPages = Math.ceil(totalItems / defaultLimit); //lấy ra tổng số trang
    const result = await this.userModel
      .find(filter)
      // tìm theo điều kiện
      .skip(offset)
      // bỏ qua bao nhiêu phần tử
      .limit(defaultLimit)
      // bao nhiêu phần tử 1 trang
      .select('-password')
      .sort(filter.sort)
      .populate(population)
      .exec();
    //chọc xuống database nên sẽ là hàm promise async await
    return {
      meta: {
        current: current, //trang hiện tại
        pageSize: pageSize, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
      // không cần phải truyền giá trị currentPage vào hàm findAll vì nó được tính toán trong hàm dựa trên offset và defaultLimit.
    };
  }

  // tìm user đúng với id truyền vào và cập nhập refresh token
  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne(
      { _id: _id },
      {
        refreshToken,
      },
    );
  };

  //tìm user dựa vào refresh token từ database
  findUserByToken = async (refreshToken: string) => {
    return await this.userModel.findOne({
      refreshToken,
    });
  };
}
