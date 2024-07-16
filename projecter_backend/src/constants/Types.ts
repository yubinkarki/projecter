import { ObjectId } from "mongoose";
import { Secret } from "jsonwebtoken";

import { RoleEnum } from "@/constants";

type MESSAGE_TYPE = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

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
  messageType: MESSAGE_TYPE;
  message?: string | Record<string, any>;
};

export type FailureResponseType = {
  success: boolean;
  errorCode?: number;
  errorCategory: string;
  errorMessage: string | Record<string, any> | unknown;
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

export type MongooseValidationErrorType = {
  name: string;
  message: string;
  errors: Record<string, any>;
};

export type LoggerMessageType = { point: string; description: string; filename: string };

// export type UserCreatedType = Document & {
//   // _id: ObjectId;
//   // createdAt: Date;
//   // updatedAt: Date;

//   role: string;
//   email: string;
//   lastName: string;
//   password: string;
//   firstName: string;
//   designation: string;
//   phoneNumber: string;
//   // currentProject: ObjectId | null;
//   // previousProjects: ObjectId[] | [];
// };
