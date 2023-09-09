import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './Schema/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';

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

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
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
        isActive
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
