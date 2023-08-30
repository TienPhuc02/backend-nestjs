import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // nhúng service vào controller

  @Post()
  create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    //@Body thực thi lấy giá trị xong gán vào email
    // bên trong @Body là key mình muốn lấy giá trị từ req, còn myEmail là biến để hứng giá trị đó
    //const email : string=req.body.email
  ) {
    //@Body -> req.body
    return this.usersService.create(email, password , name);
    // return 'test ok';
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
// kết nối xuống database, xử lý các phần mà controllers quản lí
// controller sẽ phụ trách điều hướng , khai báo routes
//controller điều hướng công việc , quản lí công việc để service quản lí
//service kết nối data base
