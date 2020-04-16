<template>
    <div class="profile-order">
      <div class="profile-white-box">
        <div class="pro-flex-box">
          <span>我的订单</span>
        </div>
        <div class="pro-arrow">
          <span>查看全部</span>
        </div>
      </div>
      <div class="profile-palace">
        <div class="pro-pa-box">
          <div class="pro-pa-grid-icon">
            <img src="~assets/img/profile/nav-001.png" alt="">
          </div>
          <div class="pro-pa-grid-text">
            <span>待付款</span>
          </div>
        </div>
        <div class="pro-pa-box">
          <div class="pro-pa-grid-icon">
            <img src="~assets/img/profile/nav-002.png" alt="">
          </div>
          <div class="pro-pa-grid-text">
            <span>待发货</span>
          </div>
        </div>
        <div class="pro-pa-box">
          <div class="pro-pa-grid-icon">
            <img src="~assets/img/profile/nav-003.png" alt="">
          </div>
          <div class="pro-pa-grid-text">
            <span>已付款</span>
          </div>
        </div>
        <div class="pro-pa-box">
          <div class="pro-pa-grid-icon">
            <img src="~assets/img/profile/nav-004.png" alt="">
          </div>
          <div class="pro-pa-grid-text">
            <span>待评价</span>
          </div>
        </div>
        <div class="pro-pa-box">
          <div class="pro-pa-grid-icon">
            <img src="~assets/img/profile/nav-005.png" alt="">
          </div>
          <div class="pro-pa-grid-text">
            <span>已评价</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "ProfileOrder"
  }
</script>

<style scoped>
  .profile-order {
    background-color: #ffffff;
    border-radius: 5px;
    width: 94%;
    margin: 1.5rem auto 0.8rem;
  }

  .profile-white-box {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }

  .pro-flex-box span {
    color: #343434;
    font-weight: bold;
    font-size: 14px;
  }

  .pro-arrow {
    position: relative;
    padding-right: 0.8rem;
  }

  .pro-arrow span {
    font-size: 0.8rem;
    color: #9b9b9b;
  }

  .pro-arrow:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #9b9b9b;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 60%;
    margin-top: -4px;
    right: 2px;
    border-radius: 1px;
  }

  .profile-palace {
    padding: 0.5rem 0;
    display: flex;
    overflow: hidden;
    justify-content: space-around;
    border-bottom: 1px solid rgba(200,200, 200, 0.9);
  }

  .pro-pa-box {
    padding: 1px;
    box-sizing: border-box;
    margin: 10px 0;
  }

  .pro-pa-grid-icon {
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }

  .pro-pa-grid-icon img {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }

  .pro-pa-grid-text {
    display: block;
    text-align: center;
    color: #333;
    font-size: 0.85rem;
    padding-top: 0.3rem;
  }
</style>
