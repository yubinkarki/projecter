import cors from "cors";
import express, { Express } from "express";

import { envConfig } from "@/config";
import { appStrings } from "@/constants";
import { connectToDb } from "@/database/Connection";
import { authRoutes, projectRoutes, taskRoutes, userRoutes } from "@/routes";

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
  app.listen(envConfig.port, () => console.log(`${appStrings.server_start_success} at port ${envConfig.port}`));
} catch (err) {
  console.log(`${appStrings.server_start_failure}`, err);
}
