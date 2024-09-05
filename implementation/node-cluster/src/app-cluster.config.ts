import { Injectable } from '@nestjs/common';
import * as _cluster from 'cluster';
import { cpus } from 'os';

const cluster = _cluster as unknown as _cluster.Cluster; // typings fix

@Injectable()
export class AppClusterConfig {
  static clusterize(bootstrap: any): void {
    if (cluster.isPrimary) {
      const numCPUs: number = cpus().length;
      console.log(
        `Master server started on ${process.pid} with ${numCPUs} CPUs`,
      );
      for (let i = 0; i < numCPUs; i++) cluster.fork();
      cluster.on('exit', () => cluster.fork());
      return;
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      bootstrap();
    }
  }
}
