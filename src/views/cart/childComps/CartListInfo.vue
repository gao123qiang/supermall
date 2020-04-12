<template>
    <div class="cart-list-info">
      <scroll class="scroll-height" ref="scroll">
        <div class="cart-item" v-for="(item, index) in cartList">
          <div class="item-selector">
            <check-button :value="item.checked"
                          @click.native="checkedChange(item)"></check-button>
          </div>
          <div class="item-img">
            <img :src="item.image" alt="商品图片">
          </div>
          <div class="item-info">
            <div class="item-title">{{item.name}}</div>
            <div class="item-desc">所选颜色 {{item.color}} 尺寸 {{item.size}}</div>
            <div class="info-bottom">
              <div class="item-price">￥ {{item.price}}</div>
              <div class="item-count">
                <button class="btn-min" @click="mulCount(item)">-</button>
                <input type="text" value="" v-model="item.count">
                <button class="btn-add" @click="addCount(item)">+</button>
              </div>
            </div>
          </div>
        </div>
      </scroll>

      <!--底部订单栏-->
      <div class="cart-bottom-bar">
        <div class="cart-bottom-check">
          <!--<van-checkbox class="checked-all">-->
            <!--全选-->
          <!--</van-checkbox>-->
          <check-button :value="isSelectAll" @click.native="changeAll"></check-button>
          <p>全选</p>
        </div>
        <div v-if="!isRightSwitch">
          <div class="cart-bottom-price">
            合计:
            <span>￥ {{totalPrice}}</span>
          </div>
          <div class="cart-bottom-btn">
            <button @click="calcClick">提交订单({{checkLength}})</button>
          </div>
        </div>
        <div v-else>
          <div class="cart-bottom-btn">
            <button @click="delCartData">删除({{checkLength}})</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CheckButton from './CheckButton'

  import { mapGetters } from 'vuex'

  import {updateCartCount, delCartData} from "network/cart";

  export default {
    name: "CartListInfo",
    data() {
      return {

      }
    },
    props: {
      isRightSwitch: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    components: {
      Scroll,
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),

      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((prev, item) => {
          return prev + item.price * item.count;
          //toFixed保留两位小数
        }, 0).toFixed(2)
      },

      checkLength() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        if (this.cartList.length === 0) {
          return false
        }
        return !this.cartList.find(item => !item.checked)
      }
    },
    activated() {
      this.$refs.scroll.refresh();
    },
    methods: {
      checkedChange(item) {
        item.checked = !item.checked;
      },
      changeAll() {
        //原来是全部选中的点击的话，变成全部不选中
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true);
        }
        //原来不是全部选中点击的话，变成全部选中
      },
      mulCount(item) {

        let type = 2;

        updateCartCount(item.id, type).then(res => {
          if (res.status === 200) {
            this.$store.dispatch('mulCartData', item.id)
          }
        })
      },
      addCount(item) {
        let type = 1;

        updateCartCount(item.id, type).then(res => {
          if (res.status === 200) {
            this.$store.dispatch('addCartData', item.id)
          }
        })
      },
      calcClick() {
        if (this.checkLength === 0) {
          this.$toast.toastShow("您还没有选中商品哦");
        }
      },
      //删除
      delCartData() {
        if (this.checkLength === 0) {
          this.$toast.toastShow("您还没有选中要删除的商品哦")
        }else {
          let ids = [];
          this.cartList.filter(item => {
            if (item.checked) {
              ids.push(item.id)
            }
          });
          //提交到服务器进行删除
          delCartData(ids).then(res => {
            if (res.status === 200) {
              this.$store.dispatch('delCartData');
              this.$toast.toastShow("您选中的商品已删除")
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .cart-list-info {
    width: 100%;
    height: 100%;
  }

  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 99px;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
  }

  .cart-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .cart-item:last-child {
    border-bottom: 0;
  }

  .item-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12%;
  }

  .item-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
  }

  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    margin-top: 15px;
    color: #666666;

  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
  }

  .item-info {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    width: 88%;
    padding: 5px 10px;
    color: #333333;
  }

  .info-bottom {
    /*position: absolute;*/
    /*right: 10px;*/
    /*bottom: 10px;*/
    /*left: 10px;*/
    /*margin-top: 10px;*/
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }

  .item-count {
    width: 60px;
    display: flex;
    flex-direction: row;
  }

  .item-count input {
    width: 30px;
    padding: 0 7px;
  }

  .btn-min, .btn-add {
    width: 15px;
  }

  .info-bottom .item-price {
    color: #ff4500;
  }

  .cart-bottom-bar {
    font-size: 15px;
    position: fixed;
    right: 0;
    bottom: 50px;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-top: 1px solid #cccccc;
  }

  .cart-bottom-check {
    display: flex;
    flex-direction: row;
  }

  .cart-bottom-check p {
    font-size: 14px;
    font-weight: 700;
    margin-left: 3px;
  }

  .cart-bottom-price {
    margin-left: 25px;
    font-size: 12px;
    font-weight: 700;
  }

  .cart-bottom-price span {
    color: red;
  }

  .cart-bottom-btn button {
    line-height: 50px;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    height: 50px;
    padding: 0 15px;
    color: white;
    border: 0;
    outline: none;
    background: linear-gradient(to right, #ff6034, #ee0a24);
    font-size: 14px;
  }

  .cart-bottom-btn button:active {
    opacity: 0.8;
  }

</style>
