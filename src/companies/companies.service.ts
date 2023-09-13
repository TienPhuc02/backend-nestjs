import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './schema/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { User } from 'src/decorator/customize';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    const { name, address, description, logo } = createCompanyDto;
    const newCompany = await this.companyModel.create({
      name: name,
      address: address,
      description: description,
      logo: logo,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return newCompany;
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize; // bỏ qua current và pageSize để lấy full item trước đã rồi lọc
    const offset: number = (+currentPage - 1) * +pageSize; // bỏ qua bao nhiêu phần tử
    const defaultLimit: number = +pageSize ? +pageSize : 10; //lấy ra số phần tử trong 1 trang
    const totalItems = (await this.companyModel.find(filter)).length; // lấy ra tổng số lượng của tất cả các phần tử
    const totalPages = Math.ceil(totalItems / defaultLimit); //lấy ra tổng số trang
    const result = await this.companyModel
      .find(filter)
      // tìm theo điều kiện
      .skip(offset)
      // bỏ qua bao nhiêu phần tử
      .limit(defaultLimit)
      // bao nhiêu phần tử 1 trang
      .sort(sort as any)
      .populate(population)
      .exec();
    //chọc xuống database nên sẽ là hàm promise async await
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: pageSize, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
      // không cần phải truyền giá trị currentPage vào hàm findAll vì nó được tính toán trong hàm dựa trên offset và defaultLimit.
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`not found company with id=${id}`);
    }
    const getCompany = await this.companyModel.findById({ _id: id });
    return getCompany;
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const { name, address, description, logo } = updateCompanyDto;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found company';
    }
    const company = this.companyModel.updateOne(
      { _id: id },
      {
        name: name,
        address: address,
        description: description,
        logo: logo,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return company;
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found company';
    }
    return this.companyModel.findOneAndDelete({ _id: id }, { isDeleted: true });
  }
  findCompanyId(id: ObjectId) {
    const findCompanyId = this.companyModel.findById({ _id: id });
    return findCompanyId;
  }
}
