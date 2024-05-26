import fs from "fs";
import path from "path";

import mongoose from "mongoose";

import { strings } from "@/constants";
import { logger, envConfig } from "@/config";

const { rootDir, customLogDir, cannotFindDbUrl, dbConnectionSuccess, dbConnectionFail } = strings;

const logsDir: string = path.join(rootDir, customLogDir);

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

mongoose.set("strictQuery", false);

export function connectToDb(): void {
  mongoose
    .connect(envConfig.databaseUrl || cannotFindDbUrl)
    .then(() => logger.info(dbConnectionSuccess))
    .catch((e: Error) => {
      throw new Error(`${dbConnectionFail} -> ${e}`);
    });
}
