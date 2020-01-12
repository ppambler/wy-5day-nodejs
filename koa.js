const Koa = require("koa");
const Router = require("koa-router");
const axios = require("axios");

// 建立实例
const app = new Koa();

// 没有路由，直接敲个url访问是没有意义的，即拿不到任何东西
const router = new Router();

// 定义一个路由
router.get("/user", ctx => {
  ctx.body = "用户首页";
});

app.use(async (ctx, next) => {
  // 求值
  let a = (await 1000) + 1000;
  console.log(a);

  // 阻塞线程
  console.time("time1");
  let b = axios.get("http://taobao.com");
  console.timeEnd("time1"); //time1 -> 2.684ms

  console.time("time2");
  let c = await axios.get("http://taobao.com");
  console.timeEnd("time2"); // time2 -> 791.079ms
});

// 定义了路由，就要使用它
app.use(router.routes());

app.listen(3000);
