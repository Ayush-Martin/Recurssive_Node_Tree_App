import App from "./app";
import http from "http";
import "reflect-metadata";

import { envConfig } from "./shared/configs/env";
import { connectDB } from "./shared/configs/db";

const appInstance = new App();
const server = http.createServer(appInstance.app);

async function init() {
  await connectDB();
}

console.log(envConfig);

init()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.info(`[Server] Running on port ${envConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`[Application] [Error] ${err}`);
  });
