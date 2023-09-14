import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Job } from 'src/jobs/Schema/job.schema';
import { Company } from 'src/companies/schema/company.schema';
import { User } from 'src/users/schemas/user.schema';
export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
  @Prop()
  @IsEmail({}, { message: 'Invalid Email' })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  email: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  userId: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  status: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  // dùng ref để lấy data join bảng
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  companyId: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Job.name })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  jobId: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: mongoose.Schema.Types.Array })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  history: {
    status: string;
    updateAt: Date;
    updatedBy: {
      _id: mongoose.Schema.Types.ObjectId;
      email: string;
    };
  }[];
  @Prop()
  createdAt: Date;
  @Prop()
  isDeleted: boolean;
  @Prop()
  updatedAt: Date;
  @Prop()
  deletedAt: Date;
  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
