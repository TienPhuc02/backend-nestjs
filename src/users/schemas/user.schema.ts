import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User {
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  description: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop({ default: false }) // Thêm trường isDeleted
  isDeleted: boolean;
  @Prop()
  createdBy:{
    _id:string,
    email:string
  }
  @Prop()
  deletedBy:{
    _id:string,
    email:string
  }
  @Prop()
  updatedBy:{
    _id:string,
    email:string
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
