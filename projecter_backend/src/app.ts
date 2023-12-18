import cors from "cors";
import express, {Express} from "express";

import {exposeApp} from "@/utils";
import {envConfig} from "@/config";
import {appStrings} from "@/constants";
import {connectToDb} from "@/database";
import {initializeRoutes} from "@/routes";

const app: Express = express();

// Built in middleware function in express. https://expressjs.com/en/api.html
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectToDb();

app.use(cors());

initializeRoutes(app);

try {
  app.listen(envConfig.port, () => console.log(`${appStrings.serverStartSuccess} at port ${envConfig.port}`));

  exposeApp();
} catch (err) {
  throw new Error(`${appStrings.serverStartFailure} -> ${err}`);
}
