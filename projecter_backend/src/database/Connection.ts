import mongoose from "mongoose";

import { appStrings } from "@/constants";

mongoose.set("strictQuery", false);

const { cannot_find_db_url, db_connection_success, db_connection_fail } = appStrings;

export const connectToDb = (): void => {
  mongoose
    .connect(process.env.DB || cannot_find_db_url)
    .then(() => {
      console.log(db_connection_success);
    })
    .catch((err: Error) => {
      console.log(db_connection_fail, err);
    });
};
