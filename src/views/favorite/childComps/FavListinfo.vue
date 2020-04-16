<template>
    <div class="fav-list-info">
      <scroll class="scroll-height">
        <div class="fav-item">
          <div class="item-selector">
            <check-button></check-button>
          </div>
          <div class="item-img">
            <img src="~assets/img/login/bj.png" alt="">
          </div>
          <div class="item-info">
            <div class="item-title">年号啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
            <div class="item-price">￥ 200.00</div>
          </div>
        </div>
      </scroll>
      <!--底部的删除导航栏-->
      <div class="fav-bottom-bar" v-show="isShow">
        <div class="fav-bottom-check">
          <!--<van-checkbox class="checked-all">-->
          <!--全选-->
          <!--</van-checkbox>-->
          <check-button></check-button>
          <p>全选</p>
        </div>
        <div>
          <div class="fav-bottom-btn">
            <button>删除</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CheckButton from '../../cart/childComps/CheckButton'

  export default {
    name: "FavListinfo",
    data() {
      return {
        isShow: false
      }
    },
    components: {
      Scroll,
      CheckButton
    }
  }
</script>

<style scoped>
  .fav-list-info {
    width: 100%;
    height: 100%;
  }

  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
  }

  .fav-item {
    display: flex;
    width: 100%;
    padding: 5px;
    background-color: #ffffff;
    margin: 10px 0;
    box-shadow: 0 -3px 3px #888888;
  }

  /*.fav-item:last-child {*/
    /*border-bottom: 0;*/
  /*}*/

  .item-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12%;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
  }

  .item-info {
    font-size: 14px;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    overflow: hidden;
    width: 88%;
    padding: 5px 10px;
    color: #333333;
  }

  .item-title {
    overflow: hidden;
    height: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
  }

  .item-price {
    color: red;
  }

  .fav-bottom-bar {
    font-size: 15px;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-top: 1px solid #cccccc;
  }

  .fav-bottom-check {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .fav-bottom-check p {
    font-size: 12px;
    margin-left: 5px;
  }

  .fav-bottom-btn button{
    line-height: 50px;
    width: 30%;
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

  .fav-bottom-btn button:active {
    opacity: 0.8;
  }
</style>
