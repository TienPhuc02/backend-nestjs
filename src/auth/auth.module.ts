import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  //import cả UsersModule để dùng cả UsersService và UsersControllers trong Module User 
  //import PassportModule để nestJS biết có passport module
  providers: [AuthService, LocalStrategy],
  //LocalStrategy dùng để biết mình muốn đăng nhập bằng jwt hay password
})
export class AuthModule {}
