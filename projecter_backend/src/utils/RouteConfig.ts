import { Response, Request } from "express";

import { appStrings } from "@/constants";

const { noRoute, serverRunning } = appStrings;

const baseRoute = (_: Request, res: Response): Response => {
  return res.status(200).send({
    status: true,
    msg: serverRunning,
  });
};

const undefinedRoute = (_: Request, res: Response): Response => {
  return res.status(404).send({
    error: true,
    msg: noRoute,
  });
};

export { baseRoute, undefinedRoute };
