const Koa = require('koa');
const http = require('http');
const bodyParser = require('koa-bodyparser');
const io = require('socket.io');
const mongoose = require('mongoose');

const { verifyJwt } = require('./services/jwt');
const { joinPlayer } = require('./services/socket');
const db = require('./db');

db.connect();

const { router } = require('./routes');


const app = new Koa();
const server = http.createServer(app.callback());
const sock = io(server);

sock.on('connection', socket => {
    socket.on('imInGame', async token => {
        const { User } = mongoose.models;
        const { user } = verifyJwt(token);
        const { _id } = await User.findOne({ _id: user });
        await joinPlayer(sock, _id.toString());
    });
});

app
    .use(bodyParser())
    .use(async (ctx, next) => {
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
    .use(router.allowedMethods());

server.listen(3000, () => console.log('server spinning on 3000'));
