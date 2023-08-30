import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email message' })
  @IsNotEmpty({
    message: 'Please Enter Your Email',
  })
  email: string;
  @IsNotEmpty({
    message: 'Please Enter Your Password',
  })
  password: string;
  @IsNotEmpty({
    message: 'Please Enter Your Name',
  })
  name: string;
  @IsNotEmpty({
    message: 'Please Enter Your Address',
  })
  address: string;
}
//DTO , muốn data giữa FE và BE thống nhất với nhau
//không dùng interface cho DTO -> dùng class
//DTO là 1 object định nghĩa hình dạng dữ liệu được “transfer” (frontend và backend)
