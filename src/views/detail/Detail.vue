<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="detailSlides"></detail-swiper>
        <detail-base-info :goodsinfo="goodsinfo"></detail-base-info>
        <detail-shop-info :shopinfo="shopinfo"></detail-shop-info>
        <detail-goods-info :detailImages="detailImages" @imageLoad="imageLoad"></detail-goods-info>
        <detail-size-info ref="params" :detailsizeimage="goodssize" @imageSizeLoad="imageSizeLoad"></detail-size-info>
        <detail-commpent-info ref="comment" :comment-info="commentInfo"></detail-commpent-info>
        <div class="title">------类似推介------</div>
        <goods-list ref="recommend" :goods="recomonds"></goods-list>
      </scroll>

      <!--回到顶部，监听组件的原生事件必须要用native修饰符编程原生组件-->
      <transition name="scroll">
        <back-top @click.native="backTop" v-show="curPosition >= 1500"></back-top>
      </transition>

      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
      <add-cart-popup :product="product"
                      :dialogCartVisible="dialogCartVisible"
                      v-show="dialogCartVisible"
                      @close-dialog="closeDialog"></add-cart-popup>

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
    import DetailBottomBar from './childComps/DetailBottomBar'
    import AddCartPopup from './childComps/AddCartPopup'

    import Scroll from 'components/common/scroll/Scroll';
    import GoodsList from 'components/content/goods/GoodsList';
    import BackTop from 'components/content/backTop/BackTop'

    import {getDetailSlide, GoodsInfo, getShopInfo, ShopInfo, getGoodComments, commentsInfo
            , getRecomonds, getGoodSpecs} from 'network/detail'

    import {debounce} from "common/utils/utils";
    import {itemListenerMixin, backTopMixin} from "common/mixin";

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
          themeTopYs: [],
          getThemeTopY: null,
          currentIndex: 0,
          dialogCartVisible: false,
          product: {},
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
        GoodsList,
        DetailBottomBar,
        BackTop,
        AddCartPopup
      },
      //加入混入
      mixins: [itemListenerMixin, backTopMixin],
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
        this.getDetailRecommond();

        //请求产品规格参数
        this.getDetailGoodsSpecs();

        this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
          this.themeTopYs.push(Number.MAX_VALUE); //js中number的最大值
        }, 100);

        // this.$nextTick(() => {
        //
        // })

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
        getDetailGoodsSpecs() {
          getGoodSpecs(this.shopId).then(res => {
            if (res.status === 200) {
              this.product.specs = res.specs;
            }
          });
        },
        imageLoad () {
          this.$refs.scroll.refresh();
          this.getThemeTopY();
        },
        imageSizeLoad() {
          this.$refs.scroll.refresh();
        },
        titleClick(index) {
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
        },
        //内容滚动
        contentScroll(position) {
          //方法1：
          //获取y值
          const positionY = -position.y;
          this.curPosition = positionY;
          //positionY和主题中的值进行对比
          let length = this.themeTopYs.length;
          // for (let i = 0; i < length; i++) {
          //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
          //     || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          //       this.currentIndex = i;
          //       this.$refs.nav.currentIndex = this.currentIndex;
          //   }
          // }
          //方法2：利用一个最大值
          for (let i = 0; i < length - 1; i++) {
            if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
            }
          }
        },
        //添加购物车
        addToCart() {
          //获取购物车需要展示的信息
          this.dialogCartVisible = true;
          this.product.image = this.detailImages[0];
          this.product.name = this.goodsinfo.single.shopname;
          this.product.price = this.goodsinfo.single.price;
          this.product.goodid = this.shopId;
        },
        closeDialog() {
          this.product = {};
          this.dialogCartVisible = false;
          this.getDetailGoodsSpecs();
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
    height: calc(100% - 100px);
  }

  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  /* vue的淡入淡出动画 */
  .scroll-enter-active,
  .scroll-leave-active {
    transition: all 0.3s;
  }

  .scroll-enter,
  .scroll-leave-to {
    opacity: 0;
  }

  .scroll-enter-to,
  .scroll-leave {
    opacity: 1;
  }
</style>
