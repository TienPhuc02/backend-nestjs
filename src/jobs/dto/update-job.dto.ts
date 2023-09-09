import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsNotEmpty } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @IsNotEmpty({ message: 'Please Enter Your Name' })
  @Prop()
  name: string;
  @IsNotEmpty({ message: 'Please Enter Your Skill' })
  @Prop({ type: Array })
  skills: string[];
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
  @IsNotEmpty({ message: 'Please Enter Your EndDate' })
  @Prop()
  endDate: Date;
  @IsNotEmpty({ message: 'Please Enter Your startDate' })
  @Prop()
  startDate: Date;
  @IsNotEmpty({ message: 'Please Enter Your isAcitve' })
  @Prop()
  isActive: boolean;
}
