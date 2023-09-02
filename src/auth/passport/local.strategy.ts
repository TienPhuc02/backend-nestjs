import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
//Đây là một chiến lược (strategy) xác thực. Nó định nghĩa cách xác thực tên người dùng và mật khẩu bằng phương thức xác thực "local".
// local stategy là xác thực tài khoản mật khẩu, local auth thì xác thực đã đăng nhập hay chưa