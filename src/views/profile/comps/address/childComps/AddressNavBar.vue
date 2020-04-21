<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <span>我的收货地址</span>
    </div>
    <div slot="right" class="right">
      <span>添加地址</span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "AddressNavBar",
    components: {
      NavBar
    },
    methods: {
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back {
    height: 100%;
  }

  .back img {
    margin-top: 10px;
  }

  .title {
    font-weight: 700;
  }

  .right {
    font-size: 12px;
    text-shadow: 0 1px 0 #000;
  }
</style>
