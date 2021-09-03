const KoaRouter = require('koa-router');
const { checkAuth } = require('../middleware/auth');

const router = new KoaRouter();

router.use(checkAuth);

router.param('id', async (id, ctx, next) => {
  ctx.state.producto = await ctx.orm.Product.findByPk(ctx.params.id);
  if (!ctx.state.producto) return ctx.throw(404);
  return next();
});

router.get('product.index', '/', async (ctx) => {
  const productos = await ctx.orm.Product.findAll({});

  await ctx.render('productos/index', {
    productos,
  });
});

router.get('product.solicitud.new', '/:id/solicitud', async (ctx) => {
  const { producto } = ctx.state;
  await ctx.render('solicitudes/new', {
    producto,
  });
});

router.post('product.solicitud.new', '/:id/solicitud', async (ctx) => {
  const { producto, currentUser } = ctx.state;
  const { cantidad, tipo } = ctx.request.body;

  const solicitud = ctx.orm.Solicitud.build({
    cantidad, tipo, ProductId: producto.id, UserId: currentUser.id,
  });

  try {
    await solicitud.save({
      fields: ['cantidad', 'tipo', 'ProductId', 'UserId'],
    });
    ctx.redirect(ctx.router.url('solicitud.show'));
  } catch (ValidationError) {
    await ctx.render('users/new', {
      errors: ValidationError.errors,
      solicitud,
    });
  }
});

module.exports = router;
