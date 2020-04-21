<template>
    <div class="check-daily">
      <sign-nav-bar class="sign-nav"></sign-nav-bar>
      <scroll class="scroll-height" ref="scroll">
        <div class="daily-head">
          <img src="~assets/img/sign/qdBanner.jpg" alt="">
        </div>
        <sign-calendar></sign-calendar>
        <sign-lottery></sign-lottery>
      </scroll>
    </div>
</template>

<script>
  import SignNavBar from './childComps/SignNavBar'
  import SignCalendar from './childComps/SignCalendar'
  import SignLottery from './childComps/SignLottery'

  import Scroll from 'components/common/scroll/Scroll';

  import { getSign } from "network/sign";

  import {getNowFormatDate} from "common/utils/utils";
  import {mapActions} from 'vuex'

  export default {
    name: "CheckDaily",
    components: {
      SignNavBar,
      Scroll,
      SignCalendar,
      SignLottery
    },
    created() {
      //获取签到数据
      this.getFlushSign();
    },
    methods: {
      ...mapActions(['flushSing']),

      getFlushSign() {
        let currentDate = getNowFormatDate();
        getSign(currentDate).then(res => {
          if (res.status === 200) {
            this.flushSing(res.content)
          }
        }).catch(error => {
          this.$toast.toastShow("获取数据失败，请刷新")
        })
      }
    }
  }
</script>

<style scoped>
  .check-daily {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .sign-nav {
    background-color: #faca34;
    /*position: relative;*/
    /*z-index: 10;*/
  }

  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    /*height: calc(100% - 44px);*/
  }

  .daily-head {
    width: 100%;
    height: 140px;
  }

  .daily-head img{
    width: 100%;
    height: 100%;
  }

</style>
