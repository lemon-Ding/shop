// npm i @koa/router   npm i koa-body
const Router = require("@koa/router");
const router = new Router({ prefix: "/api" });
router.get("/", (ctx) => {
  ctx.body = "前端接口";
});
module.exports = router;
