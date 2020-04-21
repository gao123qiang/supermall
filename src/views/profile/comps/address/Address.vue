<template>
    <div class="address">
      <address-nav-bar class="address-nav"></address-nav-bar>
      <scroll class="scroll-height" ref="scroll">
        <address-content></address-content>
      </scroll>
    </div>
</template>

<script>
  import AddressNavBar from './childComps/AddressNavBar'
  import AddressContent from './childComps/AddressContent'

  import Scroll from 'components/common/scroll/Scroll';

  export default {
    name: "Address",
    components: {
      AddressNavBar,
      AddressContent,
      Scroll
    }
  }
</script>

<style scoped>
  .address {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .address-nav {
    background-color: #faca34;
  }

  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
</style>
