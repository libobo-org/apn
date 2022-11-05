import Koa from "koa";
import koaqs from "koa-qs";
import logger from "koa-logger";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import router from "./router/index.js";

const app = new Koa();

// Use the qs library instead of querystring to support nested objects.
koaqs(app);

app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const HOST = '0.0.0.0';
const PORT = '3000';

(async function () {
  try {
    app.listen(PORT, HOST);
    console.debug(`🚀  Koa Server started at http://${HOST || 'localhost'}:${PORT}/`);
  } catch (err) {
    console.error('Error while starting up server', err);
    process.exit(1);
  }
})();
