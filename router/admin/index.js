const Router = require("koa-router");
const router = new Router();
const md5 = require("md5-node");

router.get("/login", async ctx => {
  console.log(1, ctx.config.URL_PATH);
  await ctx.render("admin/login", {
    URL_PATH: ctx.config.URL_PATH
  });
});

router.post("/login", async ctx => {
  let { username, password } = ctx.request.body;
  // 后台做的事情 -> 把用户名和密码放到数据库里去匹配 -> 如果查询结果存在，那用户名和密码肯定是有效的
  password = md5(password);
  let data = await ctx.db.query(
    `SELECT user,password FROM admin WHERE user = '${username}' AND password ='${password}' LIMIT 1`
  );
  if (data.length > 0) {
    ctx.body = "登录成功";
  } else {
    ctx.body = "登录失败";
  }
});

console.log(2, router.routes());
module.exports = router.routes();
