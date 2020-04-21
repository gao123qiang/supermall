<template>
    <div class="sign-lottery">
      <div class="title">
        <span>幸运大转盘</span>
        <span>好礼享不停100%中奖</span>
      </div>
      <div class="sign-lottery-scorll">
        <div class="lottery">
          <div class="lottery-item">
            <div class="lottery-start">
              <div class="box gray" v-if="getisLottery === 0">
                <p>请签到</p>
              </div>
              <div class="box" v-else-if="getisLottery === 1" @click="startLottery">
                <p><b>抽奖1次</b></p>
              </div>
              <div class="box gray" v-else-if="getisLottery === 2">
                <p>已抽奖</p>
              </div>
            </div>
            <ul>
              <li v-for="(item, i) in list" :class="i === index ? 'on' : ''">
                <div class="box">
                  <p><img :src="item.img" alt=""></p>
                  <p>{{item.title}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--中奖弹窗-->
      <div class="mask" v-if="isShow"></div>
      <div class="lottery-alert" v-if="isShow">
        <h1>恭喜您</h1>
        <p><img src="~assets/img/lottery/j2.png" alt=""></p>
        <h2>获得{{list[index].title}}</h2>
        <h2>{{index}}</h2>
        <div class="btnsave" @click="showToast">确定</div>
      </div>
    </div>
</template>

<script>
  import j1 from 'assets/img/lottery/j1.png'
  import j2 from 'assets/img/lottery/j2.png'

  import { addLottery } from "network/sign";

  import { getNowFormatDate } from "common/utils/utils";

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "SignLottery",
    data() {
      return {
        isStart: 1,
        isShow: false,
        list: [
          {img: j1, title: "谢谢参与"},
          {img: j2, title: "会员积分10"},
          {img: j1, title: "会员积分50"},
          {img: j2, title: "会员积分100"},
          {img: j1, title: "会员积分200"},
          {img: j2, title: "会员积分300"},
          {img: j1, title: "会员积分500"},
          {img: j2, title: "会员积分1000"},
        ],
        index: -1,
        count: 8,
        timer: 0,
        speed: 200,
        times: 0,
        cycle: 50,
        prize: -1,
        click: true,
      }
    },
    computed: {
      ...mapGetters(['getisLottery'])
    },
    methods: {
      ...mapActions(['addlottery']),

      startLottery() {
        if (!this.click) {
          return
        }
        this.startRoll();
      },
      startRoll() {
        this.times += 1; // 转动次数
        this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
        // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
        if (this.times > this.cycle + 10 && this.prize === this.index) {
          clearTimeout(this.timer);  // 清除转动定时器，停止转动
          this.prize = -1;
          this.times = 0;
          this.speed = 200;
          this.click = true;
          var that = this;
          setTimeout(res=>{
            that.isShow = true;
          },500)
        } else {
          if (this.times < this.cycle) {
            this.speed -= 10  // 加快转动速度
          } else if (this.times === this.cycle) {
            const index = parseInt(Math.random() * 10, 0) || 0;  // 随机获得一个中奖位置
            this.prize = index; //中奖位置,可由后台返回
            if (this.prize > 7) { this.prize = 7 }
          } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
            this.speed += 110
          } else {
            this.speed += 20
          }
          if (this.speed < 40) {this.speed = 40}
          this.timer = setTimeout(this.startRoll, this.speed)
        }
      },
      oneRoll () {
        let index = this.index;// 当前转动到哪个位置
        const count = this.count; // 总共有多少个位置
        index += 1;
        if (index > count - 1) { index = 0 }
        this.index = index
      },
      showToast() {
        //获取当前日期
        let currentDate = getNowFormatDate();
        this.isShow = false;
        // console.log(this.index);
        addLottery(currentDate, this.index).then(res => {
          if (res.status === 200) {
            console.log(res);
            this.isShow = false;
            this.addlottery();
          }
        }).catch(error => {
          this.$toast.toastShow("抽奖失败")
        });
      }
    }
  }
</script>

<style scoped>

  ul, li {
    list-style-type: none;
  }

  .sign-lottery {
    overflow: hidden;
    background: radial-gradient(49% 160%, #22b5ff 0, #3a72fa 100%);
    padding-bottom: 20px;
  }

  .sign-lottery .title {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    font-size: 18px;
    color: #000;
    align-items: center;
  }

  .lottery {
    animation: changeBg .5s ease infinite;
    overflow: hidden;
    padding: 20px;
    width: 100%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  @keyframes changeBg {
    0% {
      background-image:url('~assets/img/lottery/k1.png');
    }
    100% {
      background-image:url('~assets/img/lottery/k2.png');
    }
  }

  .lottery .lottery-item {
    height: 340px;
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
  }

  .lottery .lottery-item ul li {
    width: 33.33333333%;
    position: absolute;
    padding-right: 10px;
  }
  .lottery .lottery-item ul li:nth-child(2) {
    left: 33.33333333%;
  }
  .lottery .lottery-item ul li:nth-child(3) {
    left: 66.66666666%;
  }
  .lottery .lottery-item ul li:nth-child(4) {
    left: 66.66666666%;
    top: 110px;
  }
  .lottery .lottery-item ul li:nth-child(5) {
    left: 66.66666666%;
    top: 220px;
  }
  .lottery .lottery-item ul li:nth-child(6) {
    left: 33.33333333%;
    top: 220px;
  }
  .lottery .lottery-item ul li:nth-child(7) {
    left: 0;
    top: 220px;
  }
  .lottery .lottery-item ul li:nth-child(8) {
    left: 0;
    top: 110px;
  }

  .lottery .lottery-item ul li .box {
    height: 100px;
    position: relative;
    text-align: center;
    overflow: hidden;
    background: url('~assets/img/lottery/bg2.png') no-repeat center;
    background-size: 100% 100%;
  }

  .lottery .lottery-item ul li .box img {
    display: block;
    height: 50px;
    width: 50px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .lottery .lottery-item ul li .box p {
    color: #708ABF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  .lottery .lottery-item ul li.on .box {
    background: url('~assets/img/lottery/bg1.png') no-repeat center;
    background-size: 100% 100%;
  }
  .lottery .lottery-item ul li.on .box p {
    color: #fff;
  }

  .lottery .lottery-item .lottery-start {
    position: absolute;
    left: 33.33333333%;
    width: 33.33333333%;
    top: 110px;
    padding-right: 10px;
  }
  .lottery .lottery-item .lottery-start .box {
    height: 100px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
    background: url('~assets/img/lottery/bg1.png') no-repeat center;
    background-size: 100% 100%;
    line-height: 100px;
  }
  .lottery .lottery-item .lottery-start .box p b {
    font-size: 18px;
    display: block;
  }

  .lottery .lottery-item .lottery-start .box:active {
    opacity: 0.7;
  }

  .lottery .lottery-item .lottery-start .box.gray {
    background: url('~assets/img/lottery/bg3.png') no-repeat center;
    background-size: 100% 100%;
    text-align: center;
  }

  .lottery .lottery-item .lottery-start .box.gray p {
    color: #708ABF;
    font-weight: bold;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    overflow: hidden;
    z-index: 222;
    top: 0;
    left: 0;
  }
  .lottery-alert {
    max-width: 400px;
    text-align: center;
    z-index: 10000;
    border-radius: 10px;
    background: #fff;
    padding: 20px;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
  }
  .lottery-alert h1 {
    font-size: 18px;
    font-weight: bold;
    color: #D92B2F;
  }
  .lottery-alert img {
    display: block;
    height: 120px;
    margin: 0 auto;
  }
  .lottery-alert h2 {
    font-weight: normal;
    color: #D92B2F;
    font-size: 15px;
    padding-top: 15px;
  }
  .lottery-alert p {
    color: #666;
    font-size: 16px;
    padding-top: 5px;
  }
  .lottery-alert .btnsave {
    border-radius: 3px;
    box-shadow: none;
    height: 40px;
    cursor: pointer;
    line-height: 40px;
    color: #fff;
    margin-top: 12px;
    background: linear-gradient(180deg, rgba(213,60,63,1) 0%, rgba(201,20,24,1) 100%);
    font-size: 16px;
  }
</style>
