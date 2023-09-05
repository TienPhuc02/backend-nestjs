import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({type:Object})
  createdBy:{
    _id:mongoose.Schema.Types.ObjectId,
    email:string
  }
  @Prop({type:Object})
  deletedBy:{
    _id:mongoose.Schema.Types.ObjectId,
    email:string
  }
  @Prop({type:Object})
  updatedBy:{
    _id:mongoose.Schema.Types.ObjectId,
    email:string
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
