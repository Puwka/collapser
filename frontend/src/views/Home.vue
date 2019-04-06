<template>
  <div class="home">
  </div>
</template>

<script>

export default {
    name: 'home',
    inject: ['$axios'],
    created() {
        this.$axios.get('/end');
    }
};
</script>
