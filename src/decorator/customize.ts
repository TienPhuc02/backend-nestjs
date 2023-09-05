//decorator không muốn check jwt,không cần jwt để vào route
import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
//hàm Public này định nghĩa 1 decorator giúp truyền thêm 1 metadata vào request


export const RESPONSE_MESSAGE="response_message"
export const ResponseMessage = (message: string) =>
      SetMetadata(RESPONSE_MESSAGE, message);


export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
//decorator này dùng để lấy thông tin user khi request bằng cách sử dụng decorator