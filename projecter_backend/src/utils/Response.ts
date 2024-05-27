import { Response } from "express";

import { CookieType, SuccessResponseType } from "@/constants";

function success(res: Response, status: number, data: string | Record<string, any>, cookieData?: CookieType) {
  const dataType = typeof data;

  const responseObject: SuccessResponseType = {
    success: true,
    type: dataType,
  };

  if (typeof data === "string" && data.startsWith("ey") && data.length > 200) {
    responseObject.token = data;
  } else if (typeof data === "string") {
    responseObject.message = data;
  } else {
    responseObject.data = data;
  }

  if (cookieData) {
    return res.status(status).cookie(cookieData.name, cookieData.cookie, cookieData.options).send(responseObject);
  }

  return res.status(status).send(responseObject);
}

export { success };
