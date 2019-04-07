const mongoose = require('mongoose');
const socketIo = require('socket.io');

const { verifyJwt } = require('../services/jwt');
const Players = require('../models/players');

const players = new Players();

async function updatePlayersList(io) {
    const { User } = mongoose.models;

    const users = await User.find({
        _id: { $in: players.getPlayerIds() }
    }, { _id: false, nickname: 1, level: 1 });

    io.emit('updatePlayersList', users);
}

async function updatePlayer(socket, userId) {
    const { User } = mongoose.models;
    const player = await User.findOne({ _id: userId }, { _id: false, nickname: 1, level: 1 });
    socket.emit('youAre', player);
}

async function joinPlayer(socket, io, userId) {
    players.addPlayer({ socket: socket.id, id: userId });
    await updatePlayersList(io);
    await updatePlayer(socket, userId);
}

function init(server) {
    const io = socketIo(server);

    io.on('connection', socket => {
        socket.on('imInGame', async token => {
            const { User } = mongoose.models;
            const { user } = verifyJwt(token);
            const { _id } = await User.findOne({ _id: user });
            await joinPlayer(socket, io, _id.toString());
        });

        socket.on('disconnect', async () => {
            players.removePlayer(socket.id);
            await updatePlayersList(io);
        });

        socket.on('monsterDamage', damage => {
            socket.broadcast.emit('monsterDamage', damage);
        });

        socket.on('monsterSlain', async () => {
            await players.lvlUpPlayer({ socket: socket.id });
            await updatePlayersList(io);
            await updatePlayer(socket, players.getPlayerId(socket.id));
        });
    });
}

module.exports = {
    init
};
