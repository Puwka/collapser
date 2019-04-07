const Koa = require('koa');
const http = require('http');
const bodyParser = require('koa-bodyparser');
const send = require('koa-send');
const mongoose = require('mongoose');
const path = require('path');
const serve = require('koa-static');

const { verifyJwt } = require('./services/jwt');
const sockets = require('./services/socket');
const db = require('./db');
const config = require('../config');

db.connect();

const { router } = require('./routes');


const app = new Koa();
const server = http.createServer(app.callback());
sockets.init(server);

app
    .use(serve(path.join(__dirname, '..', 'dist')))
    .use(bodyParser())
    .use(async (ctx, next) => {
        if (!ctx.request.path.startsWith('/api')) {
            return next();
        }
        const { User } = mongoose.models;
        if (['/api/signin', '/api/signup'].includes(ctx.request.path)) {
            return next();
        }
        const { authorization } = ctx.request.headers;
        try {
            const { user } = verifyJwt(authorization);
            const foundUser = await User.findOne({ _id: user });

            if (!foundUser) {
                throw new Error();
            }

            ctx.state.user = foundUser;
        } catch (err) {
            ctx.throw(401, 'Unathorized');
        }
        await next();
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async ctx => {
        await send(ctx, 'index.html', {
            root: './dist',
        });
    });

process.on('SIGINT', () => {
    process.exit();
});

const PORT = process.env.ENV === 'production' ? config.production.port : config.development.port;

server.listen(PORT, () => console.log(`server spinning on ${PORT}`));
