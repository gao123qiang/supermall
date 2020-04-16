<template>
    <div class="favorite">
      <fav-nav-bar class="nav-bar" @bottomShow="bottomShow"></fav-nav-bar>
      <fav-list-info ref="favlist"></fav-list-info>
    </div>
</template>

<script>
  import FavNavBar from './childComps/FavNavBar'
  import FavListInfo from './childComps/FavListinfo'

  export default {
    name: "Favorite",
    components: {
      FavListInfo,
      FavNavBar
    },
    methods: {
      bottomShow() {
        this.$refs.favlist.isShow = !this.$refs.favlist.isShow;
      }
    }
  }
</script>

<style scoped>
  .favorite {
    position: relative;
    z-index: 999;
    background-color: #e8e8e8;
    height: 100vh;
  }

  .nav-bar {
    font-weight: 600;
    color: #000;
    background-color: #ff8198;
  }
</style>
