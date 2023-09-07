import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // chú ý param route
  
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  
  
  //practice project
  @ResponseMessage('Update A New User Success!!')
  @Patch()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    const updatedUser = await this.usersService.updateUser(updateUserDto, user);
    return updatedUser;
  }

  @Post()
  @ResponseMessage('Create A New User Success!!')
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    const newUser = await this.usersService.create(createUserDto, user);
    return {
      _id: newUser?._id,
      createAt: newUser?.createdAt,
    };
  }
  @Delete(':id')
  @ResponseMessage('Delete User!!!')
  async remove(@Param('id') id: string,@User() user:IUser ) {
    return await this.usersService.remove(id,user);
  }
  
  @Public()
  @Get(':id')
  @ResponseMessage('Get User By Id!!!')
  findOne(@Param('id') id: string,@User() user:IUser) {
    return this.usersService.findOne(id);
  }


  @Get()
  @ResponseMessage('Fetch  List User With Paginate!!!')
  findAll(
    @Query("current") current:string,
    @Query("pageSize") pageSize:string,
    @Query() qs:string,
  ) {
    return this.usersService.findAll(current,pageSize,qs);
  }
}
