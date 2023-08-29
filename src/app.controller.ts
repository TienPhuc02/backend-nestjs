import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //decorators -> syntax @function()-> nói cho trình compile biết là kí hiệu,...
//@expression -> expresion là diễn tả nó làm gì

//class User {
// @Min(0)
// @Max(10)
// @IsEmail
// email: string;
// @Max(20)
// password: string;

// }
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
