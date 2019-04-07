<template>
    <div id="app">
        <div class="whereAmI" v-if="!$route.path.startsWith('/game')">
            <router-link class="link" to="/signin">Sign In</router-link>
            <router-link class="link" to="/signup">Sign Up</router-link>
            {{$route.path}}
        </div>
        <div v-else>
            <button @click="logout" class="logout">Logout</button>
        </div>
         <router-view/>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.setItem('auth', null);
            this.$router.push('/signin');
        }
    }
};
</script>

<style lang="scss">
    body {
        min-width: 100vw;
        min-height: 100vh;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
    min-width: 100vw;
    min-height: 100vh;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.whereAmI {
    position: fixed;
    width: 150px;
    display: flex;
    flex-wrap: wrap;
    left: 30px;
    top: 30px;
    * {
        width: 100%;
    }
}
    .router-link-active {
        font-size: 35px;
    }
    .logout {
        width: 150px;
        position: fixed;
        right: 0;
        top: 0;
        height: 50px;
        text-align: center;
        vertical-align: top;
        background-color: #dddddd;
        cursor: pointer;
    }
    .link {
        color: #000;
    }
</style>
