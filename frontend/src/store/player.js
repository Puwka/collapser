export const PLAYER_STORE = 'player';
import Vue from 'vue';

export const player = {
    namespaced: true,
    state: {
        player: {},
        socket: null
    },
    getters: {
    },
    mutations: {
        setPlayer(state, payload) {
            state.player = payload;
        },
        gameInit(state, socket) {
            state.socket = socket;
        }
    },
    actions: {
        monsterSlain({ state }) {
            state.socket.emit('monsterSlain');
        },
        monsterDamage({ state }, { damage }) {
            state.socket.emit('monsterDamage', damage);
        }
    }
};
