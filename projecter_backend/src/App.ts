import cors from "cors";
import express, { Express } from "express";

import { strings } from "@/constants";
import { connectToDb } from "@/database";
import { initializeRoutes } from "@/routes";
import { envConfig, logger } from "@/config";
import { requestLogger } from "@/middlewares";

const app: Express = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Custom middlewares.
app.use(requestLogger);

initializeRoutes(app);

function appListenLog(): void {
  logger.info({
    point: "appListenLog",
    filename: __filename,
    description: `${strings.serverStartSuccess} at port ${envConfig.port} | ${envConfig.nodeEnv} mode`,
  });
}

try {
  connectToDb();
  app.listen(envConfig.port, appListenLog);
} catch (e: unknown) {
  logger.error({
    point: "Main",
    filename: __filename,
    description: `${strings.serverStartFailure} - ${e}`,
  });
}
