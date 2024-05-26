import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

import { strings, EnvConfigType } from "@/constants";

switch (process.env.NODE_ENV) {
  case "production":
    dotenv.config({ path: strings.prodEnvFile });
    break;
  case "staging":
    dotenv.config({ path: strings.stagEnvFile });
    break;
  default:
    dotenv.config({ path: strings.devEnvFile });
    break;
}

export const envConfig: EnvConfigType = {
  databaseUrl: process.env.DB,
  jwtKey: process.env.JWT_KEY as Secret,
  jwtExpiryDuration: process.env.JWT_EXPIRE,
  nodeEnv: process.env.NODE_ENV || strings.devEnv,
  port: parseInt(process.env.PORT || strings.fallbackPort, 10),
};
