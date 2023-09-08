import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Job {
  @Prop()
  name: string;
  @Prop({ type: Array })
  skills: string[];
  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop()
  location: string;
  @Prop()
  salary: number;
  @Prop()
  quantity: number;
  @Prop()
  level: string;
  @Prop()
  description: string;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  isActive: boolean;
}
