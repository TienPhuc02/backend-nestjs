import { Controller, Delete, Get } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('/tienphuc')
  findAll(): string {
    return 'This action returns all users with tien phuc';
  }
  @Get('/tienphuc/by-id')
  findById(): string {
    return 'This action will delete a user by id';
  }
}
