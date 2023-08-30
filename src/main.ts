import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public')); //js ,css,image
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //store view engine
  app.setViewEngine('ejs');
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();
