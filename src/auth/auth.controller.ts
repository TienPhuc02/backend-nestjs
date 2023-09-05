import {
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

  @Controller("auth")
  export class AuthController {
    constructor(
      private authService: AuthService,
    ) {}
    
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(@Request() req) {
      return this.authService.login(req.user);
      // khi lấy thông tin user từ service thì hiệu năng sẽ không cao, còn mình đnag làm là lấy từ controller thông qua service
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  