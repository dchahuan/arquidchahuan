const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await ctx.render('index');
});

module.exports = router;
