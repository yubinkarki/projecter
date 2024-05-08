import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

import { appStrings } from "@/constants";

type EnvConfig = {
  port: number;
  jwtKey: Secret;
  nodeEnv: string;
  databaseUrl: string | undefined;
  jwtExpiryDuration: string | undefined;
};

switch (process.env.NODE_ENV) {
  case "production":
    dotenv.config({ path: appStrings.prodEnvFile });
    break;
  case "staging":
    dotenv.config({ path: appStrings.stagEnvFile });
    break;
  default:
    dotenv.config({ path: appStrings.devEnvFile });
    break;
}

export const envConfig: EnvConfig = {
  databaseUrl: process.env.DB,
  jwtKey: process.env.JWT_KEY as Secret,
  jwtExpiryDuration: process.env.JWT_EXPIRE,
  nodeEnv: process.env.NODE_ENV || appStrings.devEnv,
  port: parseInt(process.env.PORT || appStrings.fallbackPort, 10),
};
