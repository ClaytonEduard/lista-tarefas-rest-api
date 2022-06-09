import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // instanciando o metodo de logs
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  //buscando a validacao antes de enviar para o server - de acordo com o vinculo do create-task-dto.ts
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(port);
  logger.log(`Aplicação rodando na porta: ${port}`);
}
bootstrap();
