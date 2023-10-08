import cors from "cors";
import express, { Express } from "express";

import config from "@/config/EnvConfig";
import { connectToDb } from "@/database/Connection";
import { authRoutes, projectRoutes, taskRoutes, userRoutes } from "@/routes";
import { server_start_success, server_start_failure } from "@/constants/AppStrings";

const app: Express = express();

// Built in middleware function in express. https://expressjs.com/en/api.html
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use(cors());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

try {
  app.listen(config.port, () => console.log(`${server_start_success} at port ${config.port}`));
} catch (err) {
  console.log(`${server_start_failure}`, err);
}
