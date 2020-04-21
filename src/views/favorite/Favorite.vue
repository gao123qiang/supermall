<template>
    <div class="favorite">
      <fav-nav-bar class="nav-bar" @bottomShow="bottomShow"></fav-nav-bar>
      <fav-list-info ref="favlist"></fav-list-info>
    </div>
</template>

<script>
  import FavNavBar from './childComps/FavNavBar'
  import FavListInfo from './childComps/FavListinfo'

  import { axiosGetFavs } from "network/favorite";

  import { mapActions } from 'vuex'

  export default {
    name: "Favorite",
    data() {
      return {

      }
    },
    components: {
      FavListInfo,
      FavNavBar
    },
    created() {
      //请求收藏的数据
      this.showDataFavs();
    },
    methods: {
      ...mapActions(['showFavs']),

      bottomShow() {
        this.$refs.favlist.isShow = !this.$refs.favlist.isShow;
      },

      showDataFavs() {
        axiosGetFavs().then(res => {
          if (res.status === 200) {
            if (res.favs.length === 0) {
              this.$toast.toastShow("您还没有收藏，尽快去添加收藏吧")
            }
            this.showFavs(res.favs)
          }
        }).catch(error => {
          this.$toast.toastShow("服务器繁忙")
        })
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
