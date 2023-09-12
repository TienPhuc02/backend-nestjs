import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Patch,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ResponseMessage('Create A New Company Success!!')
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @User() user: IUser,
  ) {
    const newCompany = await this.companiesService.create(
      createCompanyDto,
      user,
    );
    return {
      _id: newCompany?._id,
      createAt: newCompany?.createdAt,
    };
  }

  @Get()
  @ResponseMessage('Fetch List Company With Paginate')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageSize: string,

    @Query() qs: string,
  ) {
    return this.companiesService.findAll(+currentPage, +pageSize, qs);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companiesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser,
  ) {
    const newCompany = await this.companiesService.update(
      id,
      updateCompanyDto,
      user,
    );
    return newCompany;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
