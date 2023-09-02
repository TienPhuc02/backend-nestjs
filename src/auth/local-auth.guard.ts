import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
//auth guard local là khai báo xác thực xem đã đăng nhập hay chưa, authenticated?