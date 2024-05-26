import { Response, Request, Application } from "express";

import { strings } from "@/constants";
import { AuthRoutes, ProjectRoutes, TaskRoutes, UserRoutes } from "@/routes";

const { serverRunning, appVersion, noRoute } = strings;

function baseRoute(_: Request, res: Response): Response {
  return res.status(200).send({
    status: true,
    msg: serverRunning,
    version: appVersion,
  });
}

function undefinedRoute(_: Request, res: Response): Response {
  return res.status(404).send({
    error: true,
    msg: noRoute,
  });
}

function initializeRoutes(app: Application): void {
  app.use("/user", UserRoutes);
  app.use("/task", TaskRoutes);
  app.use("/auth", AuthRoutes);
  app.use("/project", ProjectRoutes);

  app.get("/", baseRoute);
  app.use("*", undefinedRoute);
}

export default initializeRoutes;
