<template>
    <div class="sidebar">
        <div class="player" v-for="player in list" :key="player.nickname">
            Nick: {{player.nickname}}<br>
            <span
                    class="level"
                    :class="getLevel(player.level)">Level: {{player.level}}
            </span>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { mapMutations, mapState } from 'vuex';

import { GAME_STORE, game } from '../../store/game';

export default {
    name: 'GameView',
    inject: ['$axios'],
    created() {
        this.$store.registerModule(GAME_STORE, game);
        this.$axios.get('/end');
        const socket = io('http://192.168.100.6:3000');

        socket.emit('imInGame', localStorage.getItem('auth'));
        socket.on('updatePlayersList', list => {
            this.updatePlayersList(list);
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule(GAME_STORE);
    },
    computed: {
        ...mapState(GAME_STORE, ['list'])
    },
    methods: {
        ...mapMutations(GAME_STORE, ['updatePlayersList']),
        getLevel(level) {
            if (level < 10) {
                return '';
            }
            if (level < 20) {
                return 'silver';
            }
            if (level < 30) {
                return 'gold';
            }
            if (level > 30) {
                return 'diamond';
            }
            return '';
        }
    }
};
</script>

<style lang="scss" scoped>
    .sidebar {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
        width: 200px;
        padding: 20px;
        background-color: #b8ffbe;
        .player {
            display: flex;
            height: 100px;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-wrap: wrap;
            width: 100%;
            background-color: #ddd;
            margin: 5px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;

            * {
                width: 100%;
                padding-top: 10px;
            }
            .level {
                background-color: sandybrown;
                color: #fff;
                &.silver {
                    background-color: silver;
                }
                &.gold {
                    background-color: gold;
                }
                &.diamond {
                    background-color: deepskyblue;
                }
            }
        }
    }
</style>
