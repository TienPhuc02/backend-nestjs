import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  name: string;
}
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Please Enter Your Password',
  })
  name: string;
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
    message: 'Please Enter Your Age',
  })
  age: number;
  @IsNotEmpty({
    message: 'Please Enter Your Gender',
  })
  gender: string;
  @IsNotEmpty({
    message: 'Please Enter Your Address',
  })
  address: string;
  @IsNotEmpty({
    message: 'Please Enter Your Role',
  })
  @IsMongoId({ message: 'Role có định dạng là mongo Id',})
  role: string;
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}
export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Please Enter Your Password',
  })
  name: string;
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
    message: 'Please Enter Your Age',
  })
  age: number;
  @IsNotEmpty({
    message: 'Please Enter Your Gender',
  })
  gender: string;
  @IsNotEmpty({
    message: 'Please Enter Your Address',
  })
  address: string;
}
