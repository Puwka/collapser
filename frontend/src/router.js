import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Signin from './views/Signin.vue';
import Game from './views/Game.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin
        },
        {
            path: '/game',
            name: 'game',
            component: Game
        }
    ],
});

router.beforeEach((to, from, next) => {
    const auth = localStorage.getItem('auth');
    if (['/signin', '/signup'].includes(to.path)) {
        return next();
    }
    if (!auth) {
        return next({ path: '/signin' });
    }
    if (!to.path.startsWith('/game')) {
        return next('/game');
    }
    return next();
});

export default router;
