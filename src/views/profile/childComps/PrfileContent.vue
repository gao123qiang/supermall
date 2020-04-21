<template>
    <div class="profile-content">
      <div class="profile-mon-list">
        <div class="pro-mon-item" @click="favClick">
          <div class="pro-left">
            <div class="cou-img">
              <img src="~assets/img/profile/icon-fl-001.png" alt="">
            </div>
            <div class="mon-box">
              <p>我的收藏</p>
            </div>
          </div>
          <div class="mon-arrow">
            <span></span>
          </div>
        </div>
        <div class="pro-mon-item" @click="addressClick">
          <div class="pro-left">
            <div class="cou-img">
              <img src="~assets/img/profile/icon-fl-002.png" alt="">
            </div>
            <div class="mon-box">
              <p>我的地址</p>
            </div>
          </div>
          <div class="mon-arrow">
            <span></span>
          </div>
        </div>
        <div class="pro-mon-item">
          <div class="pro-left">
            <div class="cou-img">
              <img src="~assets/img/profile/icon-fl-003.png" alt="">
            </div>
            <div class="mon-box">
              <p>账户信息</p>
            </div>
          </div>
          <div class="mon-arrow">
            <span></span>
          </div>
        </div>
        <div class="pro-mon-item">
          <div class="pro-left">
            <div class="cou-img">
              <img src="~assets/img/profile/icon-fl-004.png" alt="">
            </div>
            <div class="mon-box">
              <p>我的通知</p>
            </div>
          </div>
          <div class="mon-arrow">
            <span></span>
          </div>
        </div>
        <div class="pro-mon-item">
          <div class="pro-left">
            <div class="cou-img">
              <img src="~assets/img/profile/icon-fl-005.png" alt="">
            </div>
            <div class="mon-box">
              <p>意见反馈</p>
            </div>
          </div>
          <div class="mon-arrow">
            <span></span>
          </div>
        </div>
        <div class="pro-mon-item">
          <div class="pro-left">
            <div class="cou-img">
              <img src="~assets/img/profile/icon-fl-006.png" alt="">
            </div>
            <div class="mon-box">
              <p>设置</p>
            </div>
          </div>
          <div class="mon-arrow">
            <span></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "PrfileContent",
      methods: {
        favClick() {
          this.$router.push('/favorite')
        },
        addressClick() {
          this.$router.push('/profile/address')
        }
      }
    }
</script>

<style scoped>
  .profile-content {
    margin-top: 10px;
    padding: 5px 10px;
  }

  .profile-mon-list {
    display: flex;
    flex-direction: column;
  }

  .pro-mon-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 0.5px solid rgba(200, 200, 200, 0.5);
  }

  .pro-mon-item:last-child {
    border-bottom: none;
  }

  .pro-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cou-img {
    width: 25px;
    height: 25px;
    margin-right: 0.3rem;
  }

  .cou-img img {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
  }

  .mon-box {
    font-size: 12px;
    color: #333;
  }

  .mon-arrow {
    text-align: right;
    color: #394154;
    padding-right: 12px;
    position: relative;
    font-size: 0.85rem;
  }

  .mon-arrow span{
    color:#666666;
    font-size:0.8rem;
  }

  .mon-arrow:after {
    content: " ";
    display: inline-block;
    height: 8px;
    width: 8px;
    border-width: 1px 1px 0 0;
    border-color: #9f9f9f;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -5px;
    right: 2px;
    border-radius: 1px;
  }
</style>
