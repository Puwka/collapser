<template>
    <login-form @action="signin" button-text="Sign In"></login-form>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
    name: 'Signin',
    inject: ['$axios'],
    components: {
        LoginForm
    },
    methods: {
        async signin({ nickname, password }) {
            try {
                const response = await this.$axios.post('/signin', { nickname, password });
                if (response.token) {
                    localStorage.setItem('auth', response.token);
                    this.$router.push('/');
                }
            } catch (err) {
                alert('Incorrect credentials');
                console.log(err);
            }
        }
    }
};
</script>

<style scoped>

</style>
