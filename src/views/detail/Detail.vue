<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="detailSlides"></detail-swiper>
        <detail-base-info :goodsinfo="goodsinfo"></detail-base-info>
        <detail-shop-info :shopinfo="shopinfo"></detail-shop-info>
        <detail-goods-info :detailImages="detailImages" @imageLoad="imageLoad"></detail-goods-info>
        <detail-size-info :detailsizeimage="goodssize" @imageSizeLoad="imageSizeLoad"></detail-size-info>
        <detail-commpent-info :comment-info="commentInfo"></detail-commpent-info>
        <div class="title">------类似推介------</div>
        <goods-list :goods="recomonds"></goods-list>
      </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailSizeInfo from  './childComps/DetailSizeInfo'
    import DetailCommpentInfo from './childComps/DetailCommpentInfo'

    import Scroll from 'components/common/scroll/Scroll';
    import GoodsList from 'components/content/goods/GoodsList';

    import {getDetailSlide, GoodsInfo, getShopInfo, ShopInfo, getGoodComments, commentsInfo
            , getRecomonds} from 'network/detail'

    import {debounce} from "common/utils/utils";
    import {itemListenerMixin} from "common/mixin";

    export default {
      name: "Detail",
      data() {
        return {
          shopId: '',
          detailSlides: [],
          detailImages: [],
          goodsinfo: {},
          shopinfo: {},
          goodssize: '',
          commentInfo: {},
          recomonds: [],
          saveY: 0,
          //itemImgListener: null,
        }
      },
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailSizeInfo,
        DetailCommpentInfo,
        GoodsList
      },
      //加入混入
      mixins: [itemListenerMixin],
      created() {
        //保存传入的商品id
        this.shopId = this.$route.query.shopId;
        //请求详情页的轮播图
        this.getDetailSlides();
        //请求详情页店铺信息
        this.getDetailShopInfo();
        //获取评论信息
        this.getDetailGoodComs();
        //获取推介产品
        this.getDetailRecommond()

      },
      mounted() {
        //监听item中图片加载完成,增加防抖动函数
        //const refresh = debounce(this.$refs.scroll.refresh, 50);
        //对监听事件进行保存
        //this.itemImgListener = () => {
          //这里调用的非常频繁,怎么解决
          //refresh();
        //};

        //this.$bus.$on('itemImageLoad', this.itemImgListener)
        //获取tabControl的offsetTop
        //所有的组件都一个属性$el,用户获取组件中的元素
      },
      activated() {
        //再次打开时回到原来的位置
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
      },
      deactivated() {
        //记录上次的位置
        this.saveY = this.$refs.scroll.getScrollY()
        //取消全局事件的监听
        this.$bus.$off('itemImageLoad', this.itemImgListener);
      },
      methods: {
        getDetailSlides() {
          getDetailSlide(this.shopId).then(res => {
            if (res.status === 200) {
              this.detailSlides = res.detailSlides;
              this.detailImages = res.detailimages;
              this.goodsinfo = new GoodsInfo(res.busensures, res.single);
              this.goodssize = res.size;
            }
          })
        },
        getDetailShopInfo() {
          getShopInfo(this.shopId).then(res => {
            if (res.status === 200) {
              this.shopinfo = new ShopInfo(res.shopinfo, res.shopratings);
            }
          })
        },
        getDetailGoodComs() {
          getGoodComments(this.shopId).then(res => {
            if (res.status === 200) {
              this.commentInfo = new commentsInfo(res.comments, res.comCount, this.shopId);
            }
          })
        },
        getDetailRecommond() {
          getRecomonds(this.shopId).then(res => {
            if (res.status === 200) {
              this.recomonds = res.recomonds;
            }

          })
        },
        imageLoad () {
          this.$refs.scroll.refresh();
        },
        imageSizeLoad() {
          this.$refs.scroll.refresh();
        }
      }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content {
    height: calc(100% - 44px);
  }

  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
</style>
