import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerFactory } from './logger/logger_factory';

async function bootstrap() {
  const PORT = process.env.PORT;
  console.log(PORT);

  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('Car Dealer(lastexam)'),
  });
  const config = new DocumentBuilder()
    .setTitle('Car dealer')
    .setDescription('Car Dealer uchun dastur')
    .setVersion('1.0')
    .addTag('avto')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(PORT, () => {
    console.log('|----------------------------------------------------------|');
    console.log(
      `|       Server listening on: ${PORT}                          |`,
    );
    console.log('|----------------------------------------------------------|');
  });
}
bootstrap();

// // console.log(
// //   `| Swagger Documentation -> ${Config.ApiUrl}${Config.DocsRoute} |`,
// // );
// console.log('|----------------------------------------------------------|');
// console.log(`| Launch: ${new Date()}                                    |`);
// console.log('|----------------------------------------------------------|');
// console.log(`server is running on ${PORT}`);
// console.log(`http://localhost:${PORT}`);
