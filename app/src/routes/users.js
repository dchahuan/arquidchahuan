const KoaRouter = require('koa-router');
const { checkAuth } = require('../middleware/auth');

const router = new KoaRouter();

router.get('user.new', '/new', async (ctx) => {
  const user = ctx.orm.User.build();
  await ctx.render('users/new', {
    user,
  });
});

router.post('user.new', '/new', async (ctx) => {
  const user = ctx.orm.User.build(ctx.request.body);

  try {
    await user.save({
      fields: ['email', 'nick', 'password'],
    });

    ctx.session.currentUserId = user.id;

    ctx.redirect(ctx.router.url('user.me'));
  } catch (ValidationError) {
    await ctx.render('users/new', {
      errors: ValidationError.errors,
      user,
    });
  }
});

router.get('user.me', '/me', checkAuth, async (ctx) => {
  const { currentUser } = ctx.state;

  await ctx.render('users/me', {
    user: currentUser,
  });
});

module.exports = router;
