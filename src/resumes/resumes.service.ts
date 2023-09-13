import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeCVDto, CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './Schema/resumes.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { Company, CompanyDocument } from 'src/companies/schema/company.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { JobsService } from 'src/jobs/jobs.service';
import aqp from 'api-query-params';
import { use } from 'passport';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,
    private readonly jobsService: JobsService,
    private readonly companiesService: CompaniesService,
  ) {}
  async create(createResumeCVDto: CreateResumeCVDto, user: IUser) {
    const { companyId, jobId } = createResumeCVDto;
    const isExistUserId = await this.jobsService.findUserId(jobId);
    if (!isExistUserId) {
      throw new BadRequestException(` ${jobId}  not found`);
    }
    const isExistCompanyId = await this.companiesService.findCompanyId(
      companyId,
    );
    if (!isExistCompanyId) {
      throw new BadRequestException(` ${companyId}  not found`);
    }
    const newResume = await this.resumeModel.create({
      email: user.email,
      userId: user._id,
      status: 'PENDING',
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email,
          },
        },
      ],
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return newResume;
  }

  async findAll(current: string, pageSize: string, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize; // bỏ qua current và pageSize để lấy full item trước đã rồi lọc
    const offset: number = (+current - 1) * +pageSize; // bỏ qua bao nhiêu phần tử
    const defaultLimit: number = +pageSize ? +pageSize : 10; //lấy ra số phần tử trong 1 trang
    const totalItems = (await this.resumeModel.find(filter)).length; // lấy ra tổng số lượng của tất cả các phần tử
    const totalPages = Math.ceil(totalItems / defaultLimit); //lấy ra tổng số trang
    const result = await this.resumeModel
      .find(filter)
      // tìm theo điều kiện
      .skip(offset)
      // bỏ qua bao nhiêu phần tử
      .limit(defaultLimit)
      // bao nhiêu phần tử 1 trang
      .select('-password')
      .sort(sort as any)
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

  async findOne(id: string) {
    const getResumeId = await this.resumeModel.findById({ _id: id });
    return getResumeId;
  }

  async update(id: string, status: string, user: IUser) {
    const newResume = await this.resumeModel.updateOne(
      { _id: id },
      {
        status,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
        $push: {
          history: {
            status: status,
            updateAt: new Date(),
            updatedBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      },
    );
    return newResume;
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }
}
