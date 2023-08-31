import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
//passport-jwt -> stategy này sẽ nhả ra được, tạo ra jwt , -> nó cũng có thể dùng để giải mã token
//app.controller gọi authService để ném về token
//auth Module có JwtModule -> export AuthService ra
// DI JwtService vào auth.service -> gọi từ hàm sign ,mình muốn kí payload là gì thì mình truyền vào thôi, hàm login trả ra access_token
