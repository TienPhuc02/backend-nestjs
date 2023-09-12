import { IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
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
  @IsNotEmpty({
    message: 'Please Enter Your Logo',
  })
  logo: string;
}

