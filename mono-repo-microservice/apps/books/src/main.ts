import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'book',
        protoPath: join(__dirname, 'books/books.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
