import { ObjectId } from "mongoose";
import { Secret } from "jsonwebtoken";

import { RoleEnum } from "@/constants";

export type CookieType = {
  cookie: any;
  name: string;
  options: Record<string, any>;
};

export type DecodedUserType = {
  id: string;
  iat: number;
  exp: number;
  email: string;
  role: RoleEnum;
};

export type SuccessResponseType = {
  token?: string;
  success: boolean;
  message?: string;
  data?: Record<string, any>;
  type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
};

export type PackageJsonType = {
  main: string;
  name: string;
  author: string;
  version: string;
  license: string;
  description: string;
};

export type UserSignedDetailsType = { id: ObjectId; role: string; email: string; designation: string };

export type EnvConfigType = {
  port: number;
  jwtKey: Secret;
  nodeEnv: string;
  databaseUrl: string | undefined;
  jwtExpiryDuration: string | undefined;
};
