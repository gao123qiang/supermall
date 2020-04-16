<template>
    <div class="category">
      <nav-bar class="category-nav-bar">
        <div slot="center">商品分类</div>
      </nav-bar>
      <slide-bar :categoryList="categoryList"
                 @slideBarItemClick="slideBarItemClick"
                 ></slide-bar>
      <scroll class="scroll-height"
              ref="scroll"
              :probe-type="3"
              :pull-upload="true"
              @pullingUp="loadMore">
        <div class="title"><span>---------商品展示----------</span></div>
        <goods-list :goods="showCateGoods"></goods-list>
      </scroll>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SlideBar from 'components/content/slideBar/SlideBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getCates, getCateDetails} from "network/category";

  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Category",
    data() {
      return {
        //侧边栏的数据
        categoryList: [],
        currentIndex: 0,

        //内容
        categoryDetailList: {},
        isCate: false,
        currentCateId: ''
      }
    },
    components: {
      NavBar,
      SlideBar,
      Scroll,
      GoodsList
    },
    created() {
      //获取侧边栏数据
      this.getCategory();

      //生成所需要的数据格式
    },
    mixins: [itemListenerMixin],
    computed: {
      showCateGoods() {
        if (this.categoryDetailList[this.currentCateId] !== undefined) {
          return this.categoryDetailList[this.currentCateId].list;
        }
      }
    },
    watch: {
      isCate: function () {
        this.getGoodCateDetails(this.currentCateId);
      }
    },
    deactivated() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      getCategory() {
        getCates().then(res => {
          if (res.status === 200) {
            this.categoryList = res.cates;

            this.categoryDetailList= res.cateData;

            //默认请求的数据
            this.currentCateId = this.categoryList[0].id;

            this.isCate = true;

          }
        })
      },
      slideBarItemClick({cateId, index}) {
        this.currentIndex = index;
        this.currentCateId = cateId;
        this.getGoodCateDetails(this.currentCateId);
      },
      //生成存储内容的对象
      createCategoryDetailList() {
        for (let item of this.categoryList) {
          let categoryId = item.id;
          this.categoryDetailList[categoryId] = {
            page: 0,
            list: []
          }
        }
      },
      getGoodCateDetails(cateId) {
        //页码加1
        let page = this.categoryDetailList[cateId].page + 1;

        getCateDetails(cateId, page).then(res => {
          if (res.status === 200) {
            if (res.details.length === 0) {
              this.$toast.toastShow("已到底部");
              return
            }
            this.categoryDetailList[cateId].list.push(...res.details);
            this.categoryDetailList[cateId].page += 1;

            this.$refs.scroll.finishPullUp();
          }
        })
      },
      //加载更多
      loadMore() {
        this.getGoodCateDetails(this.currentCateId);
      }
    }
  }
</script>

<style scoped>
  .category-nav-bar {
    font-weight: 600;
    color: white;
    background-color: #ff8198;
  }

  .scroll-height {
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 100px;
    overflow: hidden;
  }

  .title {
    margin-top: 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-weight: 800;
  }
</style>
