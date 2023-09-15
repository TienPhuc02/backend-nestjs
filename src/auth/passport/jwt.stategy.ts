import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role } = payload;
    //gán thêm permissions và req.user

    const userRole = role as unknown as { _id: string; name: string };
    console.log(
      '🚀 ~ file: auth.service.ts:25 ~ AuthService ~ validateUser ~ userRole:',
      userRole,
    );
    const temp = (await this.rolesService.findOne(userRole._id)).toObject();
    //giải  mã token là việc gán vào req.user
    return {
      _id,
      name,
      email,
      role,
      permissions: temp?.permissions ?? [],
    };
  }
}
// xử lý jwt.authguard cách lấy jwt và giải mã jwt
