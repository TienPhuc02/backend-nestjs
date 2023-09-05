import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({timestamps:true})
export class Company {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
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
  @Prop({ default: false }) 
  isDeleted: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
