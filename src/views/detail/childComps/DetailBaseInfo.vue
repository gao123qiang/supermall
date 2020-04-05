<template>
  <!--Object.keys(goodsinfo).length判断对象是否为空-->
  <div class="detail-info" v-if="Object.keys(goodsinfo).length !== 0">
    <div class="info-title">{{goodsinfo.single.shopname}}</div>
    <div class="info-price">
      <span class="n-price">￥{{goodsinfo.single.price}}</span>
      <span class="o-price">￥{{goodsinfo.single.oldprice}}</span>
      <span class="discount">{{goodsinfo.single.discate}}</span>
    </div>
    <div class="info-other">
      <span>销量 {{goodsinfo.single.sales}}</span>
      <span>收藏 {{goodsinfo.single.collects}}</span>
      <span>{{goodsinfo.single.isreturn}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="item in goodsinfo.busensures">
        <img src="~assets/img/common/baozheng.png" alt="">
        <span>{{item.enname}}</span>
      </span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props: {
          goodsinfo: {
            type: Object,
            default() {
              return {}
            }
          }
        }
    }
</script>

<style scoped>
  .detail-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 10px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #ffffff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 20px;
    position: relative;
    top: -6px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid #f2f5f8;
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    /*border-bottom: 1px solid rgba(80, 80, 80, 1);*/
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>
