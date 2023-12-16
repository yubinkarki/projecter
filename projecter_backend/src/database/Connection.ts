import mongoose from "mongoose";

import {appStrings} from "@/constants";

mongoose.set("strictQuery", false);

const {cannotFindDbUrl, dbConnectionSuccess, dbConnectionFail} = appStrings;

export const connectToDb = (): void => {
  mongoose
    .connect(process.env.DB || cannotFindDbUrl)
    .then(() => {
      console.log(dbConnectionSuccess);
    })
    .catch((err: Error) => {
      console.log(dbConnectionFail, err);
    });
};
