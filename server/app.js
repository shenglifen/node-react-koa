const Koa = require('koa');
const cors = require('koa-cors');
const router = require('./routers/index')
// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(cors());//解决跨域问题
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(ctx.request.path + ':' + ctx.request.method);
    await next();
});
app.use(router.routes());
app.listen(3005);
console.log('app started at port 3005...');