import { IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
 //validate dự liệu từ request
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

