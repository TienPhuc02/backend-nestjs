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
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateResumeCVDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ResponseMessage('Create A Resume Success!!')
  async create(
    @Body() createResumeCVDto: CreateResumeCVDto,
    @User() user: IUser,
  ) {
    const newResume = await this.resumesService.create(createResumeCVDto, user);
    return {
      _id: newResume?._id,
      createdBy: newResume?.createdBy,
    };
  }

  @Get()
  @ResponseMessage('Get Resume With Paginate Success!!')
  findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(current, pageSize, qs);
  }

  @Get(':id')
  @ResponseMessage('Get A Resume With Id Success!!')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update Resume By Id Success!!')
  updateStatus(
    @Param('id') id: string,
    @User() user: IUser,
    @Body('status') status: string,
  ) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser,) {
    return this.resumesService.remove(id,user);
  }
  @Post('/by-user')
  @ResponseMessage('Get A Resume With User Success!!')
  findResumeByUser(@User() user: IUser) {
    return this.resumesService.findResumeByUser(user);
  }
}
