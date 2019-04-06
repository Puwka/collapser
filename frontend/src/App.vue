<template>
    <div id="app">
        <div class="whereAmI" v-if="!$route.path.startsWith('/game')">
            <router-link to="/signin">Sign In</router-link>
            <router-link to="/signup">Sign Up</router-link>
            {{$route.path}}
        </div>
         <router-view/>
    </div>
</template>

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
    left: 30px;
    top: 30px
}
</style>
