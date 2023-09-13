import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
  @IsEmail({}, { message: 'Invalid email message' })
  @IsNotEmpty({
    message: 'Please Enter Your Email',
  })
  email: string;
  @IsNotEmpty({
    message: 'Please Enter Your userId',
  })
  userId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty({
    message: 'Please Enter Your url',
  })
  url: string;
  @IsNotEmpty({
    message: 'Please Enter Your status',
  })
  status: string;
  @IsNotEmpty({
    message: 'Please Enter Your companyId',
  })
  companyId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty({
    message: 'Please Enter Your jobId',
  })
  jobId: mongoose.Schema.Types.ObjectId;
}
export class CreateResumeCVDto {
  @IsNotEmpty({
    message: 'Please Enter Your url',
  })
  url: string;
  @IsNotEmpty({
    message: 'Please Enter Your companyId',
  })
  companyId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty({
    message: 'Please Enter Your jobId',
  })
  jobId: mongoose.Schema.Types.ObjectId;
}
