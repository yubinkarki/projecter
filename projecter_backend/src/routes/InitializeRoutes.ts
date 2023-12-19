import {Express, Response, Request} from "express";

import {appStrings} from "@/constants";
import {undefinedRoute} from "@/utils";
import {authRoutes, projectRoutes, taskRoutes, userRoutes} from "@/routes";

const {serverRunning} = appStrings;

const initializeRoutes = (app: Express): void => {
  app.use("/user", userRoutes);
  app.use("/task", taskRoutes);
  app.use("/auth", authRoutes);
  app.use("/project", projectRoutes);

  app.get("/", (_: Request, res: Response) => {
    res.json({
      status: true,
      message: serverRunning,
    });
  });

  app.use("*", undefinedRoute);
};

export default initializeRoutes;
