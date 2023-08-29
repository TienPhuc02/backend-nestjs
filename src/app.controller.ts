import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // private readonly appService: AppService;
  // constructor(appService: AppService) {
  //   this.appService = appService;
  // }
  //IoC tách client và service ra độc lập, muốn chạy được thì cần injector để cấy DI vào
  // nhờ hạm tạo thì mỗi lần khởi động controller => nó biết được sự tồn tại của DI
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
