const Koa = require("koa");
const Router = require("koa-router"); //  http是内置的
// koa它无非就是去调用各种中间件去实现功能
const ejs = require("koa-ejs"); // 处理模板
const path = require("path"); // 处理路径
const static = require("koa-static"); // 处理静态资源
const body = require("koa-bodyparser"); // 解析post数据
const config = require("./config");
const error = require("./middleware/error");

const app = new Koa();
const router = new Router();
app.use(error);
app.use(body());

ejs(app, {
  root: path.resolve(__dirname, "template"),
  layout: false,
  viewExt: "ejs",
  cache: false,
  debug: false
});

app.context.config = config;
app.context.db = require("./libs/database");

router.get("/data", async ctx => {
  let data = await ctx.db.query("SELECT id,user,password FROM admin");
  ctx.body = data;
});

router.use("/admin", require("./router/admin"));
app.use(static(path.resolve(__dirname, "./public")));
app.use(router.routes());
app.listen(3000);
