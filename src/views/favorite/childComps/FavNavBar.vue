<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center">
      <span>我的收藏</span>
    </div>
    <div slot="right" class="right" @click="bottomShowClick">
      <span v-if="bottomShow">管理</span>
      <span v-else>取消</span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "FavNavBar",
    data() {
      return {
        bottomShow: true
      }
    },
    components: {
      NavBar
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      bottomShowClick() {
        this.bottomShow = !this.bottomShow;
        this.$emit("bottomShow")
      }
    }
  }
</script>

<style scoped>
  .back img {
    margin-top: 12px;
  }

  .right {
    font-size: 13px;
  }
</style>
