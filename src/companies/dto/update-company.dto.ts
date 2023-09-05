import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsNotEmpty({
    message: 'Please Enter Your Name Company',
  })
  name: string;
  @IsNotEmpty({
    message: 'Please Enter Your Address',
  })
  address: string;
  @IsNotEmpty({
    message: 'Please Enter Your Description',
  })
  description: string;
}
