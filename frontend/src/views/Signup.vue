<template>
    <login-form @action="signup" button-text="Sign Up"></login-form>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
    name: 'Signup',
    inject: ['$axios'],
    components: {
        LoginForm
    },
    methods: {
        async signup({ nickname, password }) {
            if (nickname.length < 4) {
                return alert('Too short nickname');
            }
            if (password.length < 6) {
                return alert('Too short password');
            }
            const success = await this.$axios.post('/signup', {
                nickname, password
            });
            if (success) {
                this.$router.push('/signin');
            }
        }
    }
};
</script>

<style scoped>

</style>
