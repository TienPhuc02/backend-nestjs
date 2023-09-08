import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './Schema/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class JobsService {
  @InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>;
  async create(createJobDto: CreateJobDto, user: IUser) {
    const { name, skills, salary, quantity, level, description,isActive,startDate,endDate } = createJobDto;
    const newJob = this.jobModel.create({
      name:name,
      skills:skills,
      salary:salary,
      quantity:quantity,
      level:level,
      description:description,
      startDate,
      endDate,
      createdBy: {
        _id: user?._id,
        email: user?.email,
        isActive,
      },
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

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
