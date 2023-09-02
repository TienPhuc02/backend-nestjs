//decorator không muốn check jwt,không cần jwt để vào route
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
//hàm Public này định nghĩa 1 decorator giúp truyền thêm 1 metadata vào request
