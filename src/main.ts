import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  //chạy nest trên cổng 3000
}
bootstrap();



// eslint-disable-next-line prettier/prettier

//folder dist dùng để dịch code trong folder src từ TS -> JS
// file .d.ts dùng để khai bái data type
//.js.map dùng để debug
// eslint-disable-next-line prettier/prettier
//test dùng test case 
//tscongig.json -> config TS dịch code TS ném vào folder dist
//tsconfig.build.json -> lấy hết bên tsconfig.json để build
//eslintrc.js -> bắt lỗi code
//file spec => cách các viết test case-> xóa file 
