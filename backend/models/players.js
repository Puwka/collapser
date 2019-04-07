class Players {
    constructor() {
        this.players = [];
    }

    addPlayer({ socket, id }) {
        if (this.players.find(player => player.id === id)) {
            return;
        }
        this.players.push({ socket, id });
    }

    removePlayer(socket) {
        const index = this.players.findIndex(player => player.socket === socket);
        this.players.splice(index, 1)
    }

    getUserIds() {
        return this.players.map(player => player.id);
    }
}

module.exports = Players;
