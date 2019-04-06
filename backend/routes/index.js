const Router = require('koa-router');
const mongoose = require('mongoose');

const { encrypt, compare } = require('../services/crypto');
const { generateJwt } = require('../services/jwt');

const { User } = mongoose.models;

const router = new Router();

const postSignUp = async ctx => {
    const { nickname, password } = ctx.request.body;
    const user = await User.findOne({ nickname });
    const encryptedPass = await encrypt(password);
    ctx.assert(!user, 400, 'Nickname is already taken');

    const newUser = new User({ nickname, password: encryptedPass });
    await newUser.save();
    ctx.body = { ok: true };
};

const postSignIn = async ctx => {
    const { nickname, password } = ctx.request.body;
    const user = await User.findOne({ nickname });
    ctx.assert(user, 400, 'No such nickname');

    const passwordMatch = await compare(password, user.password);
    ctx.assert(passwordMatch, 400, 'Incorrect credentials');
    const token = generateJwt({ user: user._id });
    ctx.body = { token };
};

router
    .prefix('/api')
    .get('/end', async ctx => {
        ctx.body = '12312';
    })
    .post('/signup', postSignUp)
    .post('/signin', postSignIn);


module.exports = { router };
