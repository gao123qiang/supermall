<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <span>每&nbsp;日&nbsp;签&nbsp;到</span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "SignNavBar",
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
</style>
