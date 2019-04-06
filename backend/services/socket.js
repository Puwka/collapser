const ingamePlayers = [];

const mongoose = require('mongoose');

async function updatePlayersList(socket) {
    const { User } = mongoose.models;
    const users = await User.find({
        _id: { $in: ingamePlayers }
    }, { _id: false, nickname: 1, level: 1 });
    socket.emit('updatePlayersList', users);
}

async function joinPlayer(socket, userId) {
    if (!ingamePlayers.includes(userId)) {
        ingamePlayers.push(userId);
    }
    await updatePlayersList(socket);
}

module.exports = {
    joinPlayer
};
