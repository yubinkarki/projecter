import {Express} from "express";

import {undefinedRoute, homeRoute} from "@/utils";
import {authRoutes, projectRoutes, taskRoutes, userRoutes} from "@/routes";

const initializeRoutes = (app: Express): void => {
  app.use("/", homeRoute);
  app.use("*", undefinedRoute);
  app.use("/user", userRoutes);
  app.use("/task", taskRoutes);
  app.use("/auth", authRoutes);
  app.use("/project", projectRoutes);
};

export default initializeRoutes;
