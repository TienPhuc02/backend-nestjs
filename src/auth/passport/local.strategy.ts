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
// function validate của class LocalStrategy được kế thừa thư viên passport, bên trong passport thì mình ném hàm này vào stategy ném vào passport-local 
//ném vào passport-local để nó biết là mình đăng nhập bởi username và password, tại vì local stategy nó sẽ phân biệt cho mình là đăng nhập bằng jwt hay username ,password
//username, password là 2 parameter được lấy từ hàm passport
//-> hàm validateUser sẽ check xem có email trong mongoDB trước đã nếu có nó sẽ so sánh password với hash passowrd từ mongoDB trong (user.service) -> nếu đúng trả ra user-> lúc này mình dùng req.user sẽ có data

// hàm validate tự động đc gọi nếu mình đăng nhập