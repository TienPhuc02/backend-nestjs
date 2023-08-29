import { Injectable } from '@nestjs/common';

@Injectable() //provider
export class AppService {
  getHello(): string {

    //model:code
    return 'Hello World! & Tien Phuc';
  }
}
