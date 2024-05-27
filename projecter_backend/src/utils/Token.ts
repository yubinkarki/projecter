import { Response } from "express";

import { success } from "@/utils";
import { CookieType, UserSchemaInterface } from "@/constants";

function sendToken(user: UserSchemaInterface, statusCode: number, res: Response): Response {
  const token: string = user.getToken();

  const options = { httpOnly: true };

  const cookieData: CookieType = {
    name: "token",
    cookie: token,
    options,
  };

  return success(res, statusCode, token, cookieData);
}

export default sendToken;
