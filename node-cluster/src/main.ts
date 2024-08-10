import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppClusterConfig } from './app-cluster.config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Process ID: ${process.pid}`);
}

AppClusterConfig.clusterize(bootstrap);
