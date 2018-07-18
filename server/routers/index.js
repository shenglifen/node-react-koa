const koaBody = require('koa-body');
const router = require('koa-router')();
const User = require('../model/user');

router.get('/users', async (ctx, next) => {
    const user = await User.findAll({
        where: {isdelete: 0},
    })
    ctx.body = user;
});

router.post('/user', koaBody(), async (ctx) => {
    const user = await User.build(ctx.request.body).save();
    ctx.body = user;
})


router.put('/user/:id', koaBody(), async (ctx) => {
    const body = ctx.request.body;
    const user = await User.findById(ctx.params.id);
    await user.update({...body})
    ctx.body = user;
})

router.delete('/user/:id', async (ctx) => {
    const user = await User.findById(ctx.params.id).then((user) => user);
    user.isdelete = 1;
    await user.save();
    ctx.body = {success: true}
});
router.post('/user-search', koaBody(), async (ctx) => {
    const body = ctx.request.body;
    const user = await User.findAndCount({
        where: {
            isdelete: 0, username: {
                $like: `%${body.search}%`
            }
        },
        limit: body.limit,
        offset: body.offset
    });
    ctx.body = user;
});

module.exports = router;