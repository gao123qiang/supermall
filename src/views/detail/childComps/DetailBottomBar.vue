<template>
    <div class="bottom-bar">
      <div class="bar-item bar-left">
        <div>
          <i class="icon service"></i>
          <span class="text">客服</span>
        </div>
        <div>
          <i class="icon shop"></i>
          <span class="text">店铺</span>
        </div>
        <div class="favorite" @click="addFavClick">
          <i v-if="isfav" class="fav">
            <img src="~assets/img/detail/fav.png" alt="">
          </i>
          <i class="icon select" v-else></i>
          <span class="text">收藏</span>
        </div>
      </div>
      <div class="bar-item bar-right">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy">购买</div>
      </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "DetailBottomBar",
        // props: {
        //   isfav: {
        //     type: Boolean,
        //     default: false
        //   }
        // },
        data() {
          return {
            isfav: false
          }
        },
        methods: {
          ...mapGetters(['getUserName']),

          addToCart() {
            if (this.getUserName) {
              this.$emit("addToCart")
            }else {
              this.$toast.toastShow("您还没有登录");

              setTimeout(() => {
                this.$router.push('/login');
              },500);
            }
          },
          addFavClick() {
            this.isfav = !this.isfav;
            this.$emit("isFavClick", this.isfav)
          }
        }
    }
</script>

<style scoped>
  .bottom-bar {
    height: 56px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .favorite {
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    justify-content: center;
    /*margin: 10px auto 3px;*/

  }

  .fav {
    padding: 8px 0 1px 0;
  }

  .fav img{
    width: 22px;
    height: 22px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -54px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }
</style>
