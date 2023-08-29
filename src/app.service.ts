import { Injectable } from '@nestjs/common';

@Injectable() //provide => mỗi file service thì cần decorator là injectable, khi có injectable thì file này có thể được dùng ở nhiều chỗ(nhúng vào trong và  dùng ở controller)
//khai báo injectable vào service nhờ có decorator injectable thì app sẽ hiểu đây là nhà cung cấp=> tới nơi nhà tiêu dùng (controller)
export class AppService {
  getHello(): string {
    return 'Hello World! & Tien Phuc';
  }
}
