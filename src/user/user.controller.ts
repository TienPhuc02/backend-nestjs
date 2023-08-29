import { Controller, Delete, Get } from '@nestjs/common';
// @Controller('user')
//@Controller => nest sex hiểu đây là function controller
//("user")=> controller phụ trách route bắt đầu là user
// @Controller('tienphuc')//("tienphuc")=> controller phụ trách route bắt đầu là tienphuc
@Controller()// nếu không thêm tham số route vào đầu hàm thì cần thêm tham số route vào bên trong class
export class UserController {
  @Get("/tienphuc")
  //sau khi xác định được route nó sẽ quan tâm đến method GET,không có tham số =>"/"=> sẽ hiểu route "/tienphuc/" có method get => "/tienphuc"
  // có tham số /tienphuc/ thì sẽ hiểu /tienphuc  có method GET
  findAll(): string {
    return 'This action returns all users with tien phuc';
  }
  @Get('/tienphuc/by-id') // -> vào route "/tienphuc/by-id" có method là get
  findById(): string {
    return 'This action will delete a user by id';
  }
}
