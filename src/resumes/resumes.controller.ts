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
    return this.resumesService.findAll(current,pageSize,qs);
  }

  @Get(':id')
  @ResponseMessage('Get A Resume With Id Success!!')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumesService.update(+id, updateResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(+id);
  }
}
