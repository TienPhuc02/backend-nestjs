import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateJobDto {
  @IsNotEmpty({ message: 'Please Enter Your Name' })
  @Prop()
  name: string;
  @IsNotEmpty({ message: 'Please Enter Your Skill' })
  @Prop({ type: Array })
  skills: string[];
  @IsNotEmpty({ message: 'Please Enter Your Company' })
  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Location' })
  location: string;
  @Prop()
  @IsNotEmpty({ message: 'Please Enter Your Salary' })
  salary: number;
  @IsNotEmpty({ message: 'Please Enter Your Quantity' })
  @Prop()
  quantity: number;
  @IsNotEmpty({ message: 'Please Enter Your Level' })
  @Prop()
  level: string;
  @IsNotEmpty({ message: 'Please Enter Your Name' })
  @Prop()
  description: string;
  @IsNotEmpty({ message: 'Please Enter Your StartDate' })
  @Prop()
  startDate: Date;
  @IsNotEmpty({ message: 'Please Enter Your Name' })
  @Prop()
  endDate: Date;
  @IsNotEmpty({ message: 'Please Enter Your Name' })
  @Prop()
  isActive: boolean;
}
