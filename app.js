const Koa = require('koa');
const {koaBody} = require('koa-body');
const app = new Koa();
// 安装 npm i @koa/cors
const cors = require('@koa/cors');
app.use(cors());

app.use(koaBody());
const api = require('./routes/api');
const admin = require("./routes/admin");

// 应用程序中间件logger
app.use(async(ctx,next)=>{
    let start = Date.now();
    await next();
    let ms = Date.now() -start;
    console.log(`${ctx.method},${ctx.url},${ms}`);
}) 

app.use(api.routes());//路由中间件
app.use(admin.routes());

app.listen(3000,()=>{
    console.log('3000开启');
})