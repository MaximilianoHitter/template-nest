import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { AllExceptionsFilter } from './logs/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //LogService
  /* const logService = app.get(LogsService);
  app.useGlobalFilters(new AllExceptionsFilter(logService)); */
  //Validaciones
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));
  //Prefijo
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
