const Koa = require("koa");
const Router = require("koa-router");

// 建立实例
const app = new Koa();

// 没有路由，直接敲个url访问是没有意义的，即拿不到任何东西
const router = new Router();

// 定义一个路由
router.get("/user", ctx => {
  ctx.body = "用户首页";
});

// 定义了路由，就要使用它
app.use(router.routes());

app.listen(3000);
