const mongoose = require('mongoose');
const socketIo = require('socket.io');

const { verifyJwt } = require('../services/jwt');
const Players = require('../models/players');

const players = new Players();

async function updatePlayersList(io) {
    const { User } = mongoose.models;
    const users = await User.find({
        _id: { $in: players.getUserIds() }
    }, { _id: false, nickname: 1, level: 1 });
    io.emit('updatePlayersList', users);
}

async function joinPlayer(socket, io, userId) {
    players.addPlayer({ socket, id: userId });
    await updatePlayersList(io);
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
    });
}

module.exports = {
    joinPlayer, init
};
