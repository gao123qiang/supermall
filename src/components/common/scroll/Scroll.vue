<template>
    <div ref="wrapper" class="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>

    import BScroll from 'better-scroll'

    export default {
      name: "Scroll",
      props: {
        probeType: {
          type: Number,
          default: 0
        },
        pullUpload: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          scroll: null,
        }
      },
      mounted() {
        //创建better-scroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          //监听到达底部
          pullUpLoad: this.pullUpload,
        });
        //监听滚动的位置
        if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position);
          });
        }
        //监听上拉时间
        if (!this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp');
        })
        }
      },
      methods: {
        //取到某个位置
        scrollTo(x, y, time=300) {
          this.scroll && this.scroll.scrollTo(x, y, time);
        },
        finishPullUp() {
          this.scroll && this.scroll.finishPullUp();
        },
        refresh() {
          this.scroll && this.scroll.refresh();
        },
        getScrollY() {
          return this.scroll ? this.scroll.y : 0;
        }
      }
    }
</script>

<style scoped>

</style>
