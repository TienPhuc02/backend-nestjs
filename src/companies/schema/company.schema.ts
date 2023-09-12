import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Name' })
  name: string;
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Address' })
  address: string;
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Description' })
  description: string;
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Logo' })
  logo: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

export const CompanySchema = SchemaFactory.createForClass(Company);
