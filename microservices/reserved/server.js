const app = require('koa')();
const router = require('koa-router')();
const db = require("../../databases/db.json");

// Log requests
app.use(function *(next){
    const start = new Date;
    yield next;
    const ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/api/reserved/:productId', function *() {
    const id = parseInt(this.params.productId);
    this.body = db.reserved.find((product) => product.id === id);
});

router.get('/api/reserved/by_user/:clientId', function *() {
    const id = parseInt(this.params.clientId);
    this.body = db.reserved.filter((product) => product.clientId === id);
});

router.get('/api/', function *() {
    this.body = "API ready to receive requests";
});

router.get('/', function *() {
    this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started');