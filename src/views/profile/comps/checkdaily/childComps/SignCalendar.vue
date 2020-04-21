<template>
  <div class="sign-content">
    <div class="top">
      <div class="out-1" v-if="!getisSign" @click="signIn">
        <div class="out-2">
          <div class="signBtn">
            <span class="sign-txt">签到</span>
            <span class="sign-txt-2">本月签到<em class="sign-count">{{getSignLength}}</em>天</span>
          </div>
        </div>
      </div>
      <div class="out-1" v-else>
        <div class="out-2">
          <div class="signBtn">
            <span class="sign-txt">已签到</span>
            <span class="sign-txt-2">本月签到<em class="sign-count">{{getSignLength}}</em>天</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">每日签到，获得一次抽奖的机会</div>
    <div class="calendar">
      <Calendar :agoDayHide="agoDayHide"
                :markDate="getSignList"
                @changeMonth="changeDate"
                ref="Calendar"></Calendar>
    </div>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component'

  import { addSign } from "network/sign";

  import { getNowFormatDate } from "common/utils/utils";

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "SignCalendar",
    data() {
      return {
        agoDayHide: "1860248400",
        // arr: ['2020/4/17', '2020/04/08'],
        // signInDisabled: true
      }
    },
    components: {
      Calendar
    },
    created() {
      this.showSign();
    },
    activated() {
      this.activeSing();
    },
    computed: {
      ...mapGetters(['getisSign', 'getSignList', 'getSignLength'])
    },
    methods: {
      ...mapActions(['addSign']),

      signIn() {
        //获取当前日期
        let currentDate = getNowFormatDate();
        addSign(currentDate).then(res => {
          if (res.status === 200) {
            console.log(res);
            this.isTodayBackChange();
            this.addSign();
            this.$toast.toastShow("签到成功")
          }
        }).catch(error => {
          this.$toast.toastShow("签到失败")
        });
      },
      isTodayBackChange() {
        this.$refs.Calendar.$el.getElementsByClassName('wh_isToday')[0].style.background = 'red'
      },
      changeDate(data) {
        console.log(data);
      },
      activeSing() {
        if (this.getisSign) {
          this.isTodayBackChange()
        }
      },
      showSign() {
        this.$nextTick(() => {
          if (this.getisSign) {
            this.isTodayBackChange()
          }
        });
      }
    }
  }
</script>

<style scoped>
  .sign-content {
    width: 100%;
    height: 100%;
  }

  .top {
    width: 100%;
    height: 160px;
    background-color: #faca34;
    margin-top: 0;
    /*margin: 0;*/
    /*margin-bottom: 3px;*/
    overflow: hidden;
  }

  .top .out-1 {
    width: 140px;
    height: 140px;
    border-radius: 100%;
    -webkit-border-radius: 100%;
    background: rgba(255, 255, 255, 0.4);
    margin: 10px auto 0 auto;
    display: flex;
    align-items: center;
  }

  .top .out-1 .out-2 {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    -webkit-border-radius: 100%;
    background: #ffffff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .top .out-1 .out-2 .signBtn {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    -webkit-border-radius: 100%;
    border: 1px solid #7ebdff;
  }

  .top .out-1 .out-2 .signBtn span {
    display: block;
    width: 85%;
    margin: 0 auto;
    text-align: center;
    color: #007aff;
  }

  .sign-txt {
    height: 50px;
    line-height: 60px;
    font-weight: 600;
    border-bottom: 1px solid #eee;
  }

  .sign-txt-2 {
    height: 50px;
    line-height: 40px;
    font-size: 12px;
  }

  .top .out-1:active {
    animation: sign .25s forwards;
    -webkit-animation: sign .25s forwards;
  }

  .tips {
    /*position: absolute;*/
    /*top: 298px;*/
    width: 100%;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    background-color: #faca34;
    color: red;
  }

  .calendar {
    width: 100%;
    /*position: absolute;*/
    /*top: 340px;*/
  }
</style>

<style>
  .wh_content_item .wh_isToday[data-v-2ebcbc83]{
    background: transparent;
    /*color: #d3212f;*/
  }
</style>
