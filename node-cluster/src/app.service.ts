import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `${process.pid}: Hello World!`;
  }

  getLoad(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${process.pid}: The result of the CPU intensive task is \n`);
      }, 1000);
    });
  }
}
