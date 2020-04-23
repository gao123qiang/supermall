<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <span>我的收货地址</span>
    </div>
    <div slot="right" class="right" @click="addAddressClick">
      <span>添加地址</span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { mapActions } from 'vuex'

  export default {
    name: "AddressNavBar",
    components: {
      NavBar
    },
    methods: {
      ...mapActions(['addressTo']),

      backClick() {
        this.$router.back()
      },
      addAddressClick() {
        const payload = {
          title: "添加收货地址",
          value: true,
          isDel: false
        };

        this.addressTo(payload);
        this.$router.push('/profile/address/edit')
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
