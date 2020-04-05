<template>
    <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
      <div class="info-header">
      <div class="header-title">用户评价({{commentInfo.comcount}})</div>
        <div class="header-more" v-if="commentInfo.comcount >= 2"
             v-show="true"
             @click="moreComments(commentInfo.goodid)">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div v-if = "commentInfo.comcount !== 0">
        <div>
          <div class="info-user">
            <img v-if="firstComment.user__avatar" :src="imageUrl(firstComment.user__avatar)" alt="">
            <span>{{firstComment.user__nick_name}}</span>
          </div>
          <div class="info-detail">
            <p v-if="firstComment.content">{{firstComment.content}}</p>
            <div class="info-other">
              <span class="date">{{firstComment.create_time | showDate}}</span>
              <span>{{firstComment.size}}</span>
            </div>
            <div class="info-imgs">
              <img v-if="firstComment.comimage1" :src="imageUrl(firstComment.comimage1)" alt="">
              <img v-if="firstComment.comimage2" :src="imageUrl(firstComment.comimage2)" alt="">
              <img v-if="firstComment.comimage3" :src="imageUrl(firstComment.comimage3)" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {formatDate} from "@/common/utils/utils";

    export default {
      name: "DetailCommpentInfo",
      props: {
        commentInfo: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      data() {
        return {
          base_root: "http://127.0.0.1:8000/media"
        }
      },
      computed: {
        imageUrl() {
          return function (imageurl) {
            return this.base_root + "/" + imageurl;
          }
        },
        firstComment() {
          if (this.commentInfo.comments !== undefined && this.commentInfo.comCount !== 0) {
            let comment = this.commentInfo.comments;
            return comment[0];
          }
        }
      },
      filters: {
        showDate: function (value) {
          let date = new Date(value);
          return formatDate(date, 'yyyy-MM-dd');
        }
      },
      methods: {
        moreComments(goodid) {
          const that = this;
          that.$router.push({
            // path: '/detail/comments',
            name: 'comments',
            query: {
              goodid
            }
          })
        }
      }
    }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
