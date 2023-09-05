import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './schema/company.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    // @InjectModel(Company.name) sẽ gắn một đối tượng Model của Mongoose có tên Company vào biến companyModel trong dịch vụ.
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {} 
    //DI model từ mongoose vào service dùng để lưu data đã 
  create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create({ ...createCompanyDto });
    // companyModel từ schema trong mongoose tạo từ request DTO đã validate
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
