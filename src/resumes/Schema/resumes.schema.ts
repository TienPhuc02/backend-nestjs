import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
  @Prop({ required: true })
  @IsEmail({}, { message: 'Invalid Email' })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  email: string;
  @Prop({ required: true, type: Object })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  userId: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  status: string;
  @Prop({ required: true, type: Object })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  companyId: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ required: true, type: Object })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  jobId: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ required: true, type: mongoose.Schema.Types.Array })
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
