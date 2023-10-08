import mongoose from "mongoose";

import { db_connection_success, db_connection_fail, cannot_find_db_url } from "@/constants/AppStrings";

mongoose.set("strictQuery", false);

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
