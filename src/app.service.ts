import { Injectable } from '@nestjs/common';

@Injectable() // khai báo ở root app service thì bên app.controller dùng appService  được luôn không cần phải khai báo hay khởi tạo lại
export class AppService {
  getHello(): string {
    return 'Hello World! & Tien Phuc';
  }
}
//DI -Dependencies Injection,service cấy DI(inject) vào client-> thằng client nào được cấy inject bởi DI thì thành IoC(2 class độc lập, client ,service độc lập)

//=> class A gọi là consumer (người tiêu thụ/sử dụng)
// service B gọi là provider (nhà cung cấp)

// còn 1 thành phần, gọi là injector (giúp tạo ra DI, và làm cho class A và B không phụ
// thuộc vào nhau :v)

// Về scope:
// - Nếu inject vào 1 modules cụ thể => chỉ có mình modules đấy sử dụng.
// - Nếu inject vào root modules => tất cả có thể dùng :v


// muốn tách client và service ra để dễ bảo trì ,test case thì cần đến thiết kế à IoC ,còn để làm ra thiết kế IoC thì mình dùng đễ DI hay còn gọi là Dependencies Injection (@Injectable() or injector)