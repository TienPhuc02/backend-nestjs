import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;
  @Prop({ required: true })
  @IsEmail({}, { message: 'Invalid Email' })
  @IsNotEmpty({ message: 'Please Enter Your Email' })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  age: string;
  @Prop()
  gender: string;
  @Prop()
  address: string;
  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop()
  role: string;
  @Prop()
  refreshToken: string;
  @Prop({ type: Object })
  createdAt: Date;
  @Prop({ type: Object })
  updatedAt: Date;
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
  @Prop()
  isDeleted: boolean;
  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
