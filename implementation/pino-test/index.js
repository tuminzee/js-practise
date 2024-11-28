const pino = require('pino');

const transport = pino.transport({
  targets: [
      {
          target: 'pino/file',
          level: 'trace',
          options: {
              destination: 'logs.txt',
              mkdir: true,
              colorize: false,
          }
      },
      {
          target: 'pino-pretty',
          level: 'trace',
          options: {
              translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
              destination: process.stdout.fd,
              colorize: true,
          }
      }
  ]
});

const logger = pino({
  browser: {
      disabled: false
  },
  level: 'trace',
}, transport);

logger.trace("This is a message");
logger.debug("This is a message");
logger.info("This is a message");
logger.warn("This is a message");
logger.error("This is a message");