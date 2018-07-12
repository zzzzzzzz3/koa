const Koa = require('koa');
const koarouter = require('koa-router');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = koarouter();

const { query } = require('./db')

//添加异步处理函数（处理中间件），函数会顺序执行
app.use(async (ctx,next)=>{
    console.log('\n---------------------------------------------------\n');
    console.log(`Process: ${ctx.request.method} ${ctx.request.url}`);
    const start_at = new Date();
    console.log(`Start at: ${start_at.toString()}`);
    await next(); //调用下一个函数
    const end_at = new Date();
    console.log(`End at: ${end_at.toString()}`);
    console.log(`Time cost: ${end_at.getTime() - start_at.getTime()} ms`);
    console.log('\n---------------------------------------------------\n');
})

// 在使用router前先添加bodyparser
app.use(bodyparser());

router.get('/user/list',async (ctx,next)=>{
    const sql = "select * from user";
    const result = await query(sql);
    ctx.response.body = result;
})

router.get('/',async (ctx,next)=>{
    const name = ctx.params.name;
    ctx.response.body = `<h1>Welcome Koa2 aaaaa</h1>`;
})

// 处理post请求
router.post('/sign',async (ctx,next)=>{
    console.log(ctx.request.body);
    const name = ctx.request.body.name || "";
    const password = ctx.request.body.password || "";

    console.log(`sign in with name: ${name} password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
})

app.use(router.routes());



app.listen(3000);
console.log('app started at port 3000');
