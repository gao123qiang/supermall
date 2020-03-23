<template>
    <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-upload="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners"></home-swiper>
        <feature-view :features="features"></feature-view>
        <recommend-view></recommend-view>
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tacClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <!--组件监听用的是native-->
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import FeatureView from './childComps/FeatureView'
    import RecommendView from './childComps/RecommendView'

    import NavBar from 'components/common/navbar/NavBar';
    import Scroll from 'components/common/scroll/Scroll';
    import TabControl from 'components/content/tabControl/TabControl';
    import GoodsList from 'components/content/goods/GoodsList';
    import BackTop from 'components/content/backTop/BackTop';

    import {getSlideShow, getFeatures, getHomeGoods} from 'network/home';

    export default {
      name: "Home",
      components: {
        RecommendView,
        HomeSwiper,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
      data() {
        return {
          banners: [],
          features: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []},
          },
          current_type: 'pop',
          isShowBackTop: false,
        }
      },
      created() {
        this.getHomeSlideShow();
        this.getHomeFeatures();
        this.getHomeGoodsData('pop');
        this.getHomeGoodsData('new');
        this.getHomeGoodsData('sell');
      },
      computed: {
        showGoods() {
          return this.goods[this.current_type].list
        }
      },
      methods: {
        getHomeSlideShow() {
          getSlideShow().then(res => {
            if (res.status == 200) {
              this.banners = res.banners;
            }
          })
        },
        getHomeFeatures() {
          getFeatures().then(res => {
            if (res.status == 200) {
              this.features = res.features;
            }
          })
        },
        getHomeGoodsData(type) {
          const page = this.goods[type].page + 1;
          getHomeGoods(type, page).then(res => {
            //...语法，将数组中所有的元素解析放到新的数组中
            if (res.status == 200) {
              this.goods[type].list.push(...res.lists);
              this.goods[type].page += 1;

              this.$refs.scroll.finishPullUp();
            }
          })
        },
        tacClick(index) {
          switch (index) {
            case 0:
              this.current_type = 'pop';
              break;
            case 1:
              this.current_type = 'new';
              break;
            case 2:
              this.current_type = 'sell';
              break;
          }
        },
        backClick() {
          //scrollTo(x, y, 延时(毫秒)),回到什么位置
          //方法1
          // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
          //方法2
          this.$refs.scroll.scrollTo(0, 0, 500);
        },
        //backtop显示和隐藏的函数
        contentScroll (position) {
          this.isShowBackTop = -position.y > 1000
        },
        loadMore() {
          this.getHomeGoodsData(this.current_type);
        }
      }
    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    /*position: sticky;*/
    top: 44px;
    background-color: #ffffff;
    z-index: 9999;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*height: calc(100% - 93px);*/
    /*margin-top: 44px;*/
  }
</style>
