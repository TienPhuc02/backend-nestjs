import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IUser } from 'src/users/users.interface';
import { CreateUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login Success!!')
  @Post('/login')
  handleLogin(
    // @Req() req: Request & {user},//merge type
    @Req() req, //merge type
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @ResponseMessage('Register Success!!')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  //get account when user f5
  @ResponseMessage('Get Account Success!!')
  @Post('/account')
  handleGetAccount(@User() user: IUser) {
    return { user };
  }
  //@Body thường được sử dụng để ánh xạ dữ liệu từ các yêu cầu POST hoặc PUT, trong khi @Request thường được sử dụng để ánh xạ dữ liệu từ các yêu cầu GET hoặc DELETE.
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
