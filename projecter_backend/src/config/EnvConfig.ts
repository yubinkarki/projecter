import { Secret } from "jsonwebtoken";

import { strings, EnvConfigType } from "@/constants";

export const envConfig: EnvConfigType = {
  databaseUrl: process.env.DB,
  jwtKey: process.env.JWT_KEY as Secret,
  jwtExpiryDuration: process.env.JWT_EXPIRE,
  nodeEnv: process.env.NODE_ENV || strings.devEnv,
  port: parseInt(process.env.PORT || strings.fallbackPort, 10),
};
