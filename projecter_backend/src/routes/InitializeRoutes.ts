import { Express } from "express";

import { baseRoute, undefinedRoute } from "@/utils";
import { authRoutes, projectRoutes, taskRoutes, userRoutes } from "@/routes";

const initializeRoutes = (app: Express): void => {
  app.use("/user", userRoutes);
  app.use("/task", taskRoutes);
  app.use("/auth", authRoutes);
  app.use("/project", projectRoutes);

  app.use("/", baseRoute);
  app.use("*", undefinedRoute);
};

export default initializeRoutes;
