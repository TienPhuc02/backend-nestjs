import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
//DTO là Data Transfer Object
//entities là model là một đối tượng mô tả cấu trúc của một tài liệu trong cơ sở dữ liệu. Model được sử dụng để xác định các trường, kiểu dữ liệu và các ràng buộc cho tài liệu.