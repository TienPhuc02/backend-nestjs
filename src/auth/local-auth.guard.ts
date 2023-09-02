import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
//LocalAuthGuard là một loại Guard được sử dụng để xác thực người dùng bằng cách sử dụng phương thức xác thực "local". Xác thực "local" thường áp dụng cho đăng nhập bằng tên người dùng và mật khẩu trên ứng dụng web
//Đây là một custom NestJS Guard được xây dựng trên cơ sở của Passport strategy. Nó được sử dụng để bảo vệ các route của ứng dụng khỏi truy cập trái phép bằng cách đảm bảo rằng người dùng đã đăng nhập.