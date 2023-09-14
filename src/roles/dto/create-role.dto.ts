import { Prop } from '@nestjs/mongoose';
import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Please Enter Your Name' })
  name: string;
  @IsNotEmpty({ message: 'Please Enter Your Description' })
  description: string;
  @IsNotEmpty({ message: 'Please Enter Your IsActive' })
  @IsBoolean({ message: 'Please Enter Your Boolean' })
  isActive: boolean;
  @IsNotEmpty({ message: 'Please Enter Your Permission' })
  @IsMongoId({ message: 'Each Permission is mongo object id' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
