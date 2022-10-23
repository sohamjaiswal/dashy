import pino from 'pino';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOG_LEVEL, LOG_PATH } from '@dashy/secrets';
import { environment } from '../../environments/environment';
// import fs = require("fs");

// const streams = [
//    { stream: process.stdout },
//    { stream: fs.createWriteStream(LOG_PATH, { flags: "a" }) },
// ];

const loggerArgs = environment.production
  ? {
      level: LOG_LEVEL,
    }
  : {
      level: LOG_LEVEL,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    };

export const Logger = pino(
  loggerArgs
  //pino.multistream(streams)
);
