import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './Schema/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose, { ObjectId } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  @InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>;
  async create(createJobDto: CreateJobDto, user: IUser) {
    const {
      name,
      skills,
      salary,
      quantity,
      level,
      description,
      isActive,
      startDate,
      endDate,
    } = createJobDto;
    await this.jobModel.create({
      name: name,
      skills: skills,
      salary: salary,
      quantity: quantity,
      level: level,
      description: description,
      startDate,
      endDate,
      createdBy: {
        _id: user?._id,
        email: user?.email,
      },
      isActive,
    });
    return {
      _id: user?._id,
      email: user?.email,
    };
  }

  async findAll(current: string, pageSize: string, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize; // bỏ qua current và pageSize để lấy full item trước đã rồi lọc
    const offset: number = (+current - 1) * +pageSize; // bỏ qua bao nhiêu phần tử
    const defaultLimit: number = +pageSize ? +pageSize : 10; //lấy ra số phần tử trong 1 trang
    const totalItems = (await this.jobModel.find(filter)).length; // lấy ra tổng số lượng của tất cả các phần tử
    const totalPages = Math.ceil(totalItems / defaultLimit); //lấy ra tổng số trang
    const result = await this.jobModel
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

  findOne(id: string) {
    return this.jobModel.findOne({ _id: id });
  }
  async findUserId(id: ObjectId) {
    return await this.jobModel.findOne({ _id: id });
  }
  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    const {
      name,
      skills,
      salary,
      quantity,
      level,
      description,
      isActive,
      startDate,
      endDate,
    } = updateJobDto;
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new BadRequestException('Không tìm thấy job với ID cụ thể');
    }
    await this.jobModel.updateOne(
      { _id: id },
      {
        name: name,
        skills: skills,
        salary: salary,
        quantity: quantity,
        level: level,
        description: description,
        startDate,
        endDate,
        updatedBy: {
          _id: user?._id,
          email: user?.email,
        },
        isActive,
      },
    );
    return {
      _id: user?._id,
      email: user?.email,
    };
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `not found user`;
    }
    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.jobModel.softDelete({ _id: id });
  }
}
