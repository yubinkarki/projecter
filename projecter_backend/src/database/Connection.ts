import mongoose from "mongoose";

import { envConfig } from "@/config";
import { appStrings } from "@/constants";

mongoose.set("strictQuery", false);

const { cannotFindDbUrl, dbConnectionSuccess, dbConnectionFail } = appStrings;

export const connectToDb = (): void => {
  mongoose
    .connect(envConfig.databaseUrl || cannotFindDbUrl)
    .then(() => console.log(dbConnectionSuccess))
    .catch((err: Error) => {
      throw new Error(`${dbConnectionFail} -> ${err}`);
    });
};
