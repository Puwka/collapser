<template>
    <div>
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

<style scoped>

</style>
