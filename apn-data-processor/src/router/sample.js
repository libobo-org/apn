import Router from 'koa-router';

const router = new Router();

router.get('/hello', async (ctx, next) => {
  console.log('get /sample/hello')
  ctx.body = {
    data: 'hello',
    success: true,
  };
  await next();
});

export default router;
