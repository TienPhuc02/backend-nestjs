import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsNotEmpty } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsNotEmpty({
    message: 'Please Enter Your status',
  })
  status: string;
  @Prop({ type: mongoose.Schema.Types.Array })
  history: {
    status: string;
    updateAt: Date;
    updatedBy: {
      _id: mongoose.Schema.Types.ObjectId;
      email: string;
    };
  }[];
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}
