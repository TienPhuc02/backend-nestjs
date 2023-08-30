import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    //cấu hình model vào module
    //name = User.name như là kiểu  định nhanh 1 id cho 1  model
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
//DTO là Data Transfer Object
//entities là model là một đối tượng mô tả cấu trúc của một tài liệu trong cơ sở dữ liệu. Model được sử dụng để xác định các trường, kiểu dữ liệu và các ràng buộc cho tài liệu.
