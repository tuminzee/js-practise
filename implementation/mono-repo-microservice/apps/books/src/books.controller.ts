import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookById } from './interfaces/book-by-id.interface';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Book } from './interfaces/book.interface';

@Controller()
export class BooksController {
  @GrpcMethod('BooksService', 'FindOne')
  findOne(
    data: BookById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Book {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
