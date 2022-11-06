import Router from 'koa-router';

import sample from './sample.js';
import analyze from './analyze.js';

const router = new Router();

router.use('/sample', sample.routes());
router.use('/analyze', analyze.routes());

export default router;
