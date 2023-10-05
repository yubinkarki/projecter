import mongoose from "mongoose";

import {
  db_connection_success,
  db_connection_fail,
} from "@/constants/AppStrings";

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB || "No Url")
  .then(() => {
    console.log(db_connection_success);
  })
  .catch((err: Error) => {
    console.log(db_connection_fail, err);
  });

module.exports;
