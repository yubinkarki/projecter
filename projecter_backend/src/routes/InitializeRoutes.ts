import { Response, Request, Application } from "express";

import { appStrings } from "@/constants";
import { authRoutes, projectRoutes, taskRoutes, userRoutes } from "@/routes";

const { serverRunning, appVersion, noRoute } = appStrings;

const baseRoute = (_: Request, res: Response): Response => {
  return res.status(200).send({
    status: true,
    msg: serverRunning,
    version: appVersion,
  });
};

const undefinedRoute = (_: Request, res: Response): Response => {
  return res.status(404).send({
    error: true,
    msg: noRoute,
  });
};

const initializeRoutes = (app: Application): void => {
  app.use("/user", userRoutes);
  app.use("/task", taskRoutes);
  app.use("/auth", authRoutes);
  app.use("/project", projectRoutes);

  app.get("/", baseRoute);
  app.use("*", undefinedRoute);
};

export default initializeRoutes;
