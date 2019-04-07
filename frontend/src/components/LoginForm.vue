<template>
    <div class="login">
        <input type="text" v-model="nickname" placeholder="nickname">
        <input type="password" v-model="password" placeholder="password">
        <button @click="action">{{buttonText}}</button>
    </div>
</template>

<script>
export default {
    name: 'Register',
    inject: ['$axios'],
    props: {
        buttonText: String
    },
    data: () => ({
        nickname: '',
        password: ''
    }),
    methods: {
        action() {
            this.$emit('action', { nickname: this.nickname, password: this.password });
        }
    }
};
</script>

<style scoped lang="scss">
.login {
    margin: 180px auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    * {
        width: 100%;
    }
    input {
        padding: 15px;
        font-size: 20px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #000;
        margin: 3px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    button {
        border: none;
        outline: none;
        cursor: pointer;
        padding: 15px;
        background: #3D7EAA;
        background: -webkit-linear-gradient(to right, #FFE47A, #3D7EAA);
        background: linear-gradient(to right, #FFE47A, #3D7EAA);
        color: #fff;
        font-size: 20px;
        margin: 3px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
}
</style>
