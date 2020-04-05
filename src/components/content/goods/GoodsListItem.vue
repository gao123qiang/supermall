<template>
    <div class="goods-item" @click="itemClick">
      <img :src="getImageUrl(goodsItem.image)" alt="" @load="imageLoad">
      <div class="goods-info">
        <p>{{goodsItem.name}}</p>
        <span class="price">￥{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.collects}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "GoodsListItem",
      data() {
        return {
          root_path: "http://127.0.0.1:8000/media"
        }
      },
      props: {
        goodsItem: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      computed: {
        getImageUrl() {
          return function (imageUrl) {
            return this.root_path + "/" + imageUrl;
          }
        }
      },
      methods: {
        //监听图片加载完成
        imageLoad() {
          this.$bus.$emit("itemImageLoad")
        },
        itemClick() {
          let shopId = this.goodsItem.id;

          this.$router.push({
            path: '/detail',
            query: {
              shopId
            }
          })
        }
      }
    }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    margin-bottom: 5px;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
