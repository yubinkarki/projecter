/* import ngrok from "ngrok";

import { envConfig } from "@/config";
import { strings } from "@/constants";

const port = envConfig.port;
const { exposingApp, ngrokError } = strings;

async function exposeApp() {
  try {
    const response = await ngrok.connect({
      addr: port,
      proto: "http",
    });

    console.log(`${exposingApp} on port ${port} and URL ->`, response);
  } catch (err) {
    console.error(ngrokError, err);
  }
}

export { exposeApp }; */
