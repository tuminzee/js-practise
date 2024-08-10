import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `${process.pid}: Hello World!`;
  }

  getLoad(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${process.pid}: Hello Heavy!`);
      }, 1000);
    });
  }
}
