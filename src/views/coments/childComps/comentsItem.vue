<template>
    <div class="comment-item">
      <div class="info-user">
        <img :src="getImageUrl(commentsItem.user__avatar)" alt="">
        <span>{{commentsItem.user__nick_name}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentsItem.content}}</p>
        <div class="info-other">
          <span class="date">{{commentsItem.create_time | showDate}}</span>
          <span>{{commentsItem.size}}</span>
        </div>
        <div class="info-imgs">
          <img v-if="commentsItem.comimage1" :src="getImageUrl(commentsItem.comimage1)" alt="">
          <img v-if="commentsItem.comimage2" :src="getImageUrl(commentsItem.comimage2)" alt="">
          <img v-if="commentsItem.comimage3" :src="getImageUrl(commentsItem.comimage3)" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  import {formatDate} from "@/common/utils/utils";

    export default {
      name: "comentsItem",
      data() {
        return {
          root_path: "http://127.0.0.1:8000/media"
        }
      },
      props: {
        commentsItem: {
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
      filters: {
        showDate: function (value) {
          let date = new Date(value);
          return formatDate(date, 'yyyy-MM-dd');
        }
      },
    }
</script>

<style scoped>
  .comment-item {
    border-bottom: 1px solid rgba(1, 1, 1, .1);
    padding-left: 5px;
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
