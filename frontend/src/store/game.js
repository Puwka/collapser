export const GAME_STORE = 'game';

export const game = {
    namespaced: true,
    state: {
        list: [],
        socket: null
    },
    getters: {
    },
    mutations: {
        updatePlayersList(state, list) {
            state.list = list.sort((a, b) => b.level - a.level);
        }
    },

};
