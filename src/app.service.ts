import { Injectable } from '@nestjs/common';

@Injectable() //provider
export class AppService {
  getHello(): string {

    //model:code
    return 'Hello World! & Tien Phuc';
  }
}
// kết nối xuống database, xử lý các phần mà controllers quản lí
// controller sẽ phụ trách điều hướng , khai báo routes