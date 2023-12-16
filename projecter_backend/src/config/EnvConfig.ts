import {Secret} from "jsonwebtoken";
import dotenv, {DotenvConfigOutput} from "dotenv";

import {appStrings} from "@/constants";

const env: DotenvConfigOutput = dotenv.config();

interface EnvConfig {
  port: number;
  jwtKey: Secret;
  appEnvironment: string;
  databaseUrl: string | undefined;
  jwtExpiryDuration: string | undefined;
}

if (process.env.ENV === "local") {
  if (env.error) {
    throw new Error(`⚠️ ${appStrings.cannotFindEnv}`);
  }
}

export const envConfig: EnvConfig = {
  databaseUrl: process.env.DB,
  jwtKey: process.env.JWT_KEY as Secret,
  jwtExpiryDuration: process.env.JWT_EXPIRE,
  appEnvironment: process.env.ENV || appStrings.devEnv,
  port: parseInt(process.env.PORT || appStrings.fallbackPort, 10),
};
