const KoaRouter = require('koa-router');

const { setCurrentUser } = require('./middleware/auth');

const index = require('./routes/index');
const users = require('./routes/users');
const session = require('./routes/session');
const products = require('./routes/products');
const solicitudes = require('./routes/solicitudes');

const router = new KoaRouter();

router.use(setCurrentUser);

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    paths: {
      sessionDeletePath: () => ctx.router.url('session.destroy'),
      sessionNewPath: () => ctx.router.url('session.new'),
      userMePath: () => ctx.router.url('user.me'),
      userNewPath: () => ctx.router.url('user.new'),
      productIndexPath: () => ctx.router.url('product.index'),
      solicitudesNewPath: (id) => ctx.router.url('product.solicitud.new', { id }),
      solicitudesShowPath: () => ctx.router.url('solicitud.show'),
    },
  });
  return next();
});

router.use('/', index.routes());
router.use('/users', users.routes());
router.use('/session', session.routes());
router.use('/market', products.routes());
router.use('/solicitudes', solicitudes.routes());
module.exports = router;
