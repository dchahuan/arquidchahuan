const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session.new', '/new', (ctx) => ctx.render(
  'session/new', {
  },
));

router.post('session.new', '/new', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.User.findOne({ where: { email } });

  const authenticated = user && await user.checkPassword(password);
  if (user && authenticated) {
    ctx.session.currentUserId = user.id;
    ctx.redirect(ctx.router.url('user.me'));
  } else {
    await ctx.render('session/new', {
      error: 'Email y/o contraseña incorrectos',
      email,
    });
  }
});

router.delete('session.destroy', '/', (ctx) => {
  ctx.session.currentUserId = null;
  return ctx.redirect('/');
});

module.exports = router;
