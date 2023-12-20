import ngrok from "ngrok";

import {envConfig} from "@/config";
import {appStrings} from "@/constants";

const port = envConfig.port;
const {exposingApp, ngrokError} = appStrings;

const exposeApp = async () => {
  try {
    const response = await ngrok.connect({
      addr: port,
      proto: "http",
    });

    console.log(`${exposingApp} on port ${port} and URL ->`, response);
  } catch (err) {
    console.error(ngrokError, err);
  }
};

export {exposeApp};
