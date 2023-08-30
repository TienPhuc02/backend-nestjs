import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    // @Body('email') email: string,
    // @Body('password') password: string,
    // @Body('name') name: string,
    @Body() CreateUserDto: CreateUserDto,
  ) {
    return this.usersService.create(CreateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // chú ý param route
  @Get(':id')
  findOne(@Param('id') id: string) {
    //const id= req.params.id
    // lấy giá trị có key là id từ param
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
//plain text(text thường) -> hash text(mã hóa)
