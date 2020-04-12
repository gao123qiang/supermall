import {debounce} from "common/utils/utils";

//混入的运用，对于一些重复性的对象进行封装
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //监听item中图片加载完成,增加防抖动函数
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    //对监听事件进行保存
    this.itemImgListener = () => {
      //这里调用的非常频繁,怎么解决
      refresh();
    };

    this.$bus.$on('itemImageLoad', this.itemImgListener)
    //获取tabControl的offsetTop
    //所有的组件都一个属性$el,用户获取组件中的元素
  }
};

export const backTopMixin = {
  data() {
    return {
      //当前滚动的位置
      curPosition: 0
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
};

