const KoaRouter = require('koa-router');
const { checkAuth } = require('../middleware/auth');

const router = new KoaRouter();

router.use(checkAuth);

router.get('solicitud.show', '/', async (ctx) => {
  const { currentUser } = ctx.state;
  const solicitudesCompra = await ctx.orm.Solicitud.findAll({
    where: {
      UserId: currentUser.id,
      tipo: 0,
    },
    include: ctx.orm.Product,
  });

  const solicitudesVenta = await ctx.orm.Solicitud.findAll({
    where: {
      UserId: currentUser.id,
      tipo: 1,
    },
    include: ctx.orm.Product,
  });

  await ctx.render('users/solicitudes', {
    solicitudesCompra,
    solicitudesVenta,
  });
});

module.exports = router;
