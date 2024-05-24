import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

import { Strings, EnvConfigType } from "@/constants";

switch (process.env.NODE_ENV) {
  case "production":
    dotenv.config({ path: Strings.prodEnvFile });
    break;
  case "staging":
    dotenv.config({ path: Strings.stagEnvFile });
    break;
  default:
    dotenv.config({ path: Strings.devEnvFile });
    break;
}

export const EnvConfig: EnvConfigType = {
  databaseUrl: process.env.DB,
  jwtKey: process.env.JWT_KEY as Secret,
  jwtExpiryDuration: process.env.JWT_EXPIRE,
  nodeEnv: process.env.NODE_ENV || Strings.devEnv,
  port: parseInt(process.env.PORT || Strings.fallbackPort, 10),
};
