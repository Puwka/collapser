<template>
    <div class="monster" @click="hit()" v-if="Object.keys(player).length">
        <div class="health" :style="'top:' + countHealth + '%'">
            <div class="monster-name">Scary Droplet</div>
            <div class="monster-health">Health: {{health}}</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { PLAYER_STORE } from '../../store/player';

export default {
    name: 'Monster',
    data: () => ({
        health: null,
        initHealth: null,
        initialSpawned: false
    }),
    computed: {
        ...mapState(PLAYER_STORE, ['player', 'socket']),
        countHealth() {
            return 100 - (this.health * 100 / this.initHealth);
        },
    },
    watch: {
        socket(socket, empty) {
            if (empty !== null) {
                return;
            }
            socket.on('monsterDamage', damage => {
                this.hit(damage);
            });
        },
        player() {
            if (this.initialSpawned) {
                return;
            }
            this.spawnMonster();
            this.initialSpawned = true;
        }
    },
    methods: {
        ...mapActions(PLAYER_STORE, ['monsterDamage', 'monsterSlain']),
        hit(damage) {
            const calcDamage = damage || this.playerDamage();
            if (!damage) {
                this.monsterDamage({ damage: calcDamage });
            }
            this.health = Math.max(this.health - calcDamage, 0);
            if (this.health === 0) {
                this.monsterSlain();
                this.spawnMonster();
            }
        },
        playerDamage() {
            return Math.max(
                Math.round(Math.random() * this.player.level * 20),
                3
            );
        },
        totalHealth() {
            return Math.round(Math.random() * this.player.level * 1000);
        },
        spawnMonster() {
            this.health = this.totalHealth();
            console.log(this.player.level);
            this.initHealth = this.health;
        }
    }
};
</script>

<style scoped lang="scss">
    .monster {
        margin: 150px auto 0 auto;
        padding: 30px;
        text-align: center;
        height: 150px;
        width: 250px;
        cursor: pointer;
        user-select: none;
        background-color: salmon;
        color: #fff;
        position: relative;
        z-index: 1123;
        overflow: hidden;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;

        &-name {
            z-index: 123;
        }
        &-health {
            z-index: 123;
        }
        .health {
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0;
            background: linear-gradient(to right, #FFE47A, #3D7EAA);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            * {
                width: 100%;
            }
        }
    }
</style>
