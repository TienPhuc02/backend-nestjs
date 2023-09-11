import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage('Created A New Job Success!!')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    const newJobCreated = this.jobsService.create(createJobDto, user);
    return newJobCreated;
  }

  @Get()
  @ResponseMessage('Get A Job With Paginate By Id Success!!')
  findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(current,pageSize,qs);
  }

  @Get(':id')
  @ResponseMessage('Get A Job By Id Success!!')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Updated A New Job Success!!')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
