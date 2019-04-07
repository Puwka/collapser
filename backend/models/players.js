const mongoose = require('mongoose');

class Players {
    constructor() {
        this.players = [];
    }

    addPlayer({ socket, id }) {
        this.removePlayer(socket);
        this.players.push({ socket, id });
    }

    removePlayer(socket) {
        const index = this.players.findIndex(player => player.socket === socket);
        if (index !== -1) {
            this.players.splice(index, 1);
        }
    }

    getPlayerIds() {
        return this.players.map(player => player.id);
    }

    getPlayerId(socketId) {
        return this.players.find(player => player.socket === socketId).id;
    }

    async lvlUpPlayer({ socket: socketId }) {
        const { User } = mongoose.models;
        const { id } = this.players.find(player => player.socket === socketId);
        await User.findOneAndUpdate({ _id: id }, {
            $inc: {
                level: 1
            }
        });
    }
}

module.exports = Players;
