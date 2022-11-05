import Router from 'koa-router';
import {analyze} from "../index.js";

const router = new Router();

router.get('/tnved-analyze', async (ctx, next) => {
  console.log('get /analyze/tnved-analyze');
  if (!ctx.query.tnved) {
    throw new Error('Undefined tnved')
  }
  const data = await analyze(ctx.params.tnved);
  ctx.body = {
    data,
    success: true,
  };
  await next();
});

export default router;
