import cors from "cors";
import express, { Express } from "express";

import { envConfig } from "@/config";
import { appStrings } from "@/constants";
import { connectToDb } from "@/database";
import { initializeRoutes } from "@/routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use(cors());

initializeRoutes(app);

try {
  app.listen(envConfig.port, () =>
    console.log(`${appStrings.serverStartSuccess} at port ${envConfig.port} | ${envConfig.nodeEnv} mode`)
  );
} catch (e) {
  throw new Error(`${appStrings.serverStartFailure} -> ${e}`);
}
