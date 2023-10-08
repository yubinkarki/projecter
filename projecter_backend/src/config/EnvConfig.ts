import dotenv, { DotenvConfigOutput } from "dotenv";

import { cannot_find_env, fallback_port, devEnv } from "@/constants/AppStrings";

const env: DotenvConfigOutput = dotenv.config();

if (process.env.ENV === "local") {
  if (env.error) {
    throw new Error(`⚠️ ${cannot_find_env}`);
  }
}

export default {
  databaseUrl: process.env.DB,
  port: parseInt(process.env.PORT || fallback_port, 10),
  jwtKey: process.env.JWT_KEY,
  jwtExpiryDuration: process.env.JWT_EXPIRE,
  appEnvironment: process.env.ENV || devEnv,
};
