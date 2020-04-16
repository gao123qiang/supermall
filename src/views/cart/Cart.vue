<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">
          购物车(
            <span>{{cartLength}}</span>
          )
        </div>
        <div slot="right" @click="NavRightSwitch" class="right">
          <span v-if="!isRightSwitch">管理</span>
          <span v-else>完成</span>
        </div>
      </nav-bar>
      <cart-list-info :isRightSwitch="isRightSwitch"></cart-list-info>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartListInfo from './childComps/CartListInfo'

  import { mapGetters } from 'vuex'

  import {getCartData} from "network/cart"

  export default {
      name: "Cart",
      data() {
        return {
          isRightSwitch: false,
        }
      },
      components: {
        NavBar,
        CartListInfo
      },
      computed: {
        // cartLength() {
        //   return this.$store.getters.cartLength;
        // }
        //将getters中的方法转换为计算属性，直接调用
        ...mapGetters(['cartLength'])
      },
      created() {
        //打开购物车界面时，请求购物车数据库数据,通过vuex来记录
        //从服务器获取数据
        getCartData().then(res => {
          if (res.status === 200) {
            this.$store.dispatch('showCartData', res.cart);
          }
        });
      },
      methods: {
        NavRightSwitch() {
          this.isRightSwitch = !this.isRightSwitch;
        }
      }
    }
</script>

<style scoped>
  .nav-bar {
    font-weight: 600;
    color: #000;
    background-color: #ff8198;
  }

  .right {
    font-size: 12px;
    font-weight: normal;
  }
</style>
