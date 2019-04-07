<template>
    <div class="container">
        <div class="sidebar">
            <div class="player" v-for="player in list" :key="player.nickname">
                Nick: {{player.nickname}}<br>
                <span
                        class="level"
                        :class="getLevel(player.level)">Level: {{player.level}}
                </span>
            </div>
        </div>
        <monster></monster>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { mapMutations, mapState } from 'vuex';

import { GAME_STORE, game } from '../../store/game';
import { PLAYER_STORE, player } from '../../store/player';
import Monster from '@/components/Game/Monster.vue';

export default {
    name: 'GameView',
    inject: ['$axios'],
    components: {
        Monster
    },
    beforeCreate() {
        this.$store.registerModule(GAME_STORE, game);
        this.$store.registerModule(PLAYER_STORE, player);
    },
    async created() {
        const { endpoint } = await this.$axios.get('/end');
        const socket = io(`http://${endpoint}`);

        this.gameInit(socket);
        socket.emit('imInGame', localStorage.getItem('auth'));
        socket.on('updatePlayersList', list => {
            this.updatePlayersList(list);
        });
        socket.on('youAre', payload => {
            this.setPlayer(payload);
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule(GAME_STORE);
        this.$store.unregisterModule(PLAYER_STORE);
    },
    computed: {
        ...mapState(GAME_STORE, ['list'])
    },
    methods: {
        ...mapMutations(GAME_STORE, ['updatePlayersList']),
        ...mapMutations(PLAYER_STORE, ['setPlayer', 'gameInit']),
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
    .container {
        display: flex;
    }
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
