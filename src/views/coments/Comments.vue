<template>
    <div id="comments">
      <nav-bar class="comments-nav">
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center">全部评论({{total_count}})</div>
      </nav-bar>
      <scroll class="content"
              ref="scroll"
              :pull-upload="true"
              @pullingUp="loadMore">
        <div class="sum_up">
          <span>质量好评(151)</span>
          <span>质量还可以(200)</span>
          <span>质量一般般(300)</span>
        </div>
        <coments-info :commentsInfo="comments.list"></coments-info>
      </scroll>
    </div>
</template>

<script>

  import ComentsInfo from './childComps/comentsInfo'

  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll';

  import {getComments} from 'network/comments';

    export default {
      name: "Comments",
      data() {
        return {
          goodId: "",
          comments: {
            page: 0,
            list: []
          },
          total_count: 0
        }
      },
      components: {
        NavBar,
        Scroll,
        ComentsInfo
      },
      activated() {
        this.$refs.scroll.refresh();
      },
      created() {
        this.goodId = this.$route.query.goodid;

        //按分页请求到评论
        this.getDetailComments();
      },
      methods: {
        getDetailComments() {
          const page = this.comments.page + 1;
          getComments(this.goodId, page).then(res => {
            if (res.status === 200) {
              this.comments.list.push(...res.coms);
              this.total_count = res.total_count;
              this.comments.page += 1;

              this.$refs.scroll.finishPullUp();
            }
          })
        },
        loadMore() {
          this.getDetailComments();
        },
        backClick() {
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  #comments {
    height: 100vh;
    position: relative;
  }

  .comments-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .sum_up {
    padding: 10px 5px;
    border-bottom: 1px solid rgba(1,1,1,.1);
  }
  .sum_up span {
    background-color: chartreuse;
    margin-right: 40px;
    border-radius: 5px;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .back img{
    margin-top: 12px;
  }

</style>
