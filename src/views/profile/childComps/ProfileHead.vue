<template>
    <div>
      <div class="profile-head">
        <div class="aui-flex">
          <div class="aui-user-img">
            <img src="~assets/img/profile/touxiang.jpg" alt="">
          </div>
          <div class="aui-user-name" v-if="getToken" @click="loginClick">
            <span>{{getUserName}}</span>
          </div>
          <div class="aui-user-name" v-else>
            <span>登录</span>
          </div>
          <div class="aui-user-btn" @click="signClick">
            <button><i class="icon icon-in"></i>每日签到</button>
          </div>
        </div>
      </div>
      <div class="profile-head-bottom">
        <div class="aui-flex">
          <div class="aui-sml-img">
            <img src="~assets/img/profile/sd.png" alt="">
          </div>
          <div class="aui-user-bottom-name">
            <span>积分会员制 <img src="~assets/img/profile/ar.png" alt=""></span>
            <p>积分越高，享受的折扣越大，权益月丰富</p>
          </div>
          <div class="aui-fen">1000<em>分</em></div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "ProfileHead",
    computed: {
      ...mapGetters(['getToken', 'getUserName'])
    },
    created() {

    },
    methods: {
      loginClick() {
        this.$router.push({
          path: '/login'
        })
      },
      signClick() {
        this.$router.push({
          path: '/profile/sign'
        })
      }
    }
  }
</script>

<style scoped>
  .profile-head {
    background-color: #d7bc85;
    padding: 1rem 0 2rem 0;
    font-family: "Myriad Set Pro","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif;
  }

  .aui-flex {
    padding: 10px 15px;
    display: flex;
    align-items: center;
  }

  .aui-user-img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.7);
  }

  .aui-user-img img {
    width: 50px;
    height: 50px;
  }

  .aui-user-name {
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    flex: 1;
    margin-left: 5px;
  }

  .aui-user-btn button {
    background: #bb9951;
    border: none;
    color: #fff;
    font-size: 0.8rem;
    border-radius: 22px;
    padding: 0.15rem 0.8rem 0.15rem 1.5rem;
    position: relative;
    outline: 0;
  }

  .icon {
    width: 20px;
    height: 20px;
    display: block;
    border: none;
    float: left;
    background-size: 20px;
    background-repeat: no-repeat;
  }

  .icon-in{
    background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAZCAIAAAC6gEm5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJGQTU4RUY4NjY2MTFFOTlCQ0ZDMzc2ODdBMTI5NEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJGQTU4RjA4NjY2MTFFOTlCQ0ZDMzc2ODdBMTI5NEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkZBNThFRDg2NjYxMUU5OUJDRkMzNzY4N0ExMjk0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkZBNThFRTg2NjYxMUU5OUJDRkMzNzY4N0ExMjk0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpSdAPIAAAO/SURBVHjaZFTbbhtHDCVnuLfo5joOFLgFGsBAmuc+9Fv6d/2AfkV/oEVfCqRB2gZJFQuWbVkX787OhSVnJQVGVwJ2doeHe8hzOPjLTz+CXAbG48vp5Hwy/aqpp1Q0aEtblEQkmyGE6HuOffBt2222m/vN9m63W0BSKFFRffvq+5fz76CqLBpgvRBRNyWEWW5lUUJRy0K2pojzrzFyAueul28//PMrtn/8XI/mYAKwAcxpT5e8OV3/35I3ibr9ksrKJQNGo9NTWJKgAaev+HA/phOCRoACJ/PwO9QLKC+hmMum/A7RjLIwQ0W5HN3SvPKYC/QL0y+guyFAH921ddeABKZJdmpoxLYAJsbCYKU4dsgeMGD0KexN3EBqgUMEsJiIwUodCYJJnjli3HF/KAqRBa0Lg0oKMq38CjklFKoCR3J9qgtZGEZFKnuISpqNrBgPDUIeWhBzImQkyYUcO8/mt3fL5cYlTTrgYehdBqcsMesCE5/EUUqCSAIUOPmY3v69eo92Nimno3L8TPxkxVGW0JihhZpRtImBxWN9iLtHv9n3D9s+cJTKaNKU272Th9Wmu9s6Tig1ce6CBbSaBmJKcZBHNnKA0BsoC5zeXD1f3GxXyy4ksRxD9qeWCxQhctReJNWaWAJAOyY1ESIZupjXly8m1Bi8ms+u5tOHLu723b71XR9dkA+nGA7eIgOW2BiqyNalHTXFeFTPapvrZDo4BnFal7OatHBWgbIdDsMivI4eE2uhaio+wGQGxX3e0SZzzO3O6mY7mpwA4YtHcxmaXYJzL8RwYN59uHfeaJ/USapVTqkveFD3oLFSghyQHzVCgAKnm/t+vf73/OzZ2YSm46auxNopx1o4euHJo7Gt85tdu96Gu/WjZ0sNhTbA6m53ey8fWoO1VVUWVnaYjLWZtkglekl3fUTneohRSeg4oMDp9auLPz9tfedingpI0T22vUaogU/ng8mdFZgyzBVZwdfV628mNBtXP7yp1ju32rr9vmu7EHyKB/an21CbHhglmaam0ai+mFRn40o+Qnm4eDZuzkYF4FSGQTj7kLKjhb0SkXosGTFqIX4yVmdOXCiHA0QZYnIeSuHEkXWidcALa+SfvUBwlDN9OVCPgotZEXsP5q9Pq54LRnvi/cQLQibLfPIInk5PtAIUON3eP262719enL94XpVUCNthfpCHYHs4R7M1hsNCcvY+3Nzur1d3PgAlsC7ix8/rj5+xrKy0qqkLmQVSXU1hNIVXRVMQRUNsOy8t71VATkYH4j8BBgB7cV04ESqkEQAAAABJRU5ErkJggg==');
    background-size:12px;
    width:15px;
    height:15px;
    position:absolute;
    left:0.5rem;
    top:0.3rem;
  }

  .profile-head-bottom {
    background-image: url("~assets/img/profile/nav.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    -moz-background-size:100% 100%;
    width: 94%;
    border-radius: 10px;
    margin: -2rem auto 0.9rem;
    position: relative;
  }

  .profile-head-bottom .aui-flex {
    padding: 10px 15px;
  }

  .aui-user-bottom-name {
    font-size: 0.8rem;
    color: #f1debd;
  }

  .aui-user-bottom-name span {
    position: relative;
    width: 68%;
  }

  .aui-user-bottom-name p {
    font-size: 0.7rem;
    margin-top: 5px;
  }

  .aui-user-bottom-name span img {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 0;
    left: 70px;
    top: 0;
  }

  .aui-sml-img {
    width: 22px;
    height: 22px;
    margin-right: 0.5rem;
  }

  .aui-sml-img img {
    width: 22px;
    height: 22px;
  }

  .aui-fen {
    color: #3a2506;
    background: -webkit-linear-gradient(left, #c7a260 , #f1d5ab); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #c7a260 , #f1d5ab); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #c7a260 , #f1d5ab); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #c7a260 , #f1d5ab); /* 标准的语法 */
    background-color:#c7a260;
    border-radius:3px;
    padding:0.15rem 0.4rem;
    border:1px solid #d5be9c;
    font-size: 0.4rem;
    position: absolute;
    right: 5px;
    bottom: -10px;
    line-height: 15px;
    text-align: center;
  }

  .aui-fen em {
    margin-left: 2px;
    color:#331700;
    font-style:normal;
    font-size:0.6rem;
  }
</style>
