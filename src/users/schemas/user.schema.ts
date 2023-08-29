import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>; // định nghĩa kiểu dữ liệu cho document user

@Schema()
export class User {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: number;
  @Prop()
  name: string;
  @Prop()
  age: string;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
