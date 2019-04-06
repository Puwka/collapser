import Vue from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

axios.interceptors.response
    .use(response => response.data, error => {
        if (error.response.status === 401) {
            localStorage.setItem('auth', null);
            router.push('/signin');
        }
        Promise.reject(error.response.data);
    });

axios.interceptors.request.use(request => {
    request.headers.authorization = localStorage.getItem('auth');
    return request;
});

axios.defaults.baseURL = '/api';

new Vue({
    router,
    store,
    render: h => h(App),
    provide: {
        $axios: axios
    }
}).$mount('#app');
