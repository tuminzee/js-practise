import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UsersModule } from './users/users.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';

@Module({
  imports: [UsersModule],
  controllers: [ApiGatewayController, BooksController],
  providers: [ApiGatewayService, BooksService],
})
export class ApiGatewayModule {}
