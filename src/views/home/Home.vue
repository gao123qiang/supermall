<template>
    <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <feature-view :features="features"></feature-view>
      <recommend-view></recommend-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
    </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import FeatureView from './childComps/FeatureView'
    import RecommendView from './childComps/RecommendView'

    import NavBar from 'components/common/navbar/NavBar';
    import TabControl from 'components/content/tabControl/TabControl';

    import {getSlideShow, getFeatures, getHomeGoods} from 'network/home';

    export default {
      name: "Home",
      components: {
        RecommendView,
        HomeSwiper,
        FeatureView,
        NavBar,
        TabControl
      },
      data() {
        return {
          banners: [],
          features: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []},
          }
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
            console.log(res);
            //...语法，将数组中所有的元素解析放到新的数组中
            //this.goods[type].list.push(...res.lists);
            //this.goods[type].page += 1;
          })
        }
      }
    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 2000px;
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
    position: sticky;
    top: 44px;
    background-color: #ffffff;
  }
</style>
