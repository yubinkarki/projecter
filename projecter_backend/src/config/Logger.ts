import path from "path";
import winston from "winston";

import { emojis, strings } from "@/constants";

const { errorLogFile, customLogDir, dateFormat, rootDir } = strings;

const logsDir: string = path.join(rootDir, customLogDir);

const levels: winston.config.AbstractConfigSetLevels = {
  warn: 1,
  info: 2,
  http: 3,
  debug: 5,
  error: 0,
  silly: 6,
  verbose: 4,
};

const format: winston.Logform.Format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({ format: dateFormat }),
  winston.format.printf((info) => {
    const message = info.message;
    const timestamp = info.timestamp;
    const level = info.level.toUpperCase();
    const emoji = emojis[info.level] || emojis["fallback"];

    return `${timestamp} - ${emoji} ${level} - ${message}`;
  })
);

export const logger: winston.Logger = winston.createLogger({
  levels: levels,
  transports: [
    new winston.transports.Console({
      format: format,
      level: "debug",
    }),
    new winston.transports.File({
      level: "warn",
      format: format,
      filename: path.join(logsDir, `${errorLogFile}`),
    }),
  ],
});
