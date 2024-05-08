import { RoleEnum, DesignationEnum } from "@/constants";

export type CookieType = {
  cookie: any;
  name: string;
  options: Record<string, any>;
};

export type NewUserFormType = {
  email: string;
  lastName: Date;
  firstName: Date;
  password: string;
  phoneNumber: string;
  designation: DesignationEnum;
};

export type DecodedUserType = {
  id: string;
  iat: number;
  exp: number;
  email: string;
  role: RoleEnum;
};
