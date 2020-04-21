<template>
    <div class="content">
      <div class="content-item">
        <div class="left">
          <div class="left-quan">
            <span>李</span>
          </div>
        </div>
        <div class="center">
          <div class="center-top">
            <span class="name">李美梅</span>
            <span>18713351672</span>
          </div>
          <div class="center-bottom">
            <span>北京 北京市 朝阳区 八里庄街道 北京市朝阳区东四环中路远洋国际中心A座2006室</span>
          </div>
        </div>
        <div class="right">
          <p>编辑</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "addressContent"
    }
</script>

<style scoped>
  .content {
    width: 100%;
    font-size: 12px;

  }

  .content-item {
    padding: 8px 0 15px 0;
    display: flex;
  }

  .left {
    width: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
  }

  .left-quan {
    width: 27px;
    height: 27px;
    border-radius: 100%;
    background: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .center {
    width: 76%;
    padding: 0 5px 0 3px;
    border-right: 0.1px solid #eee;
  }

  .right {
    width: 12%;
  }

  .center-top {
    padding: 2px 0;
  }

  .center-top .name {
    margin-right: 10px;
    font-weight: 600;
  }

  .center-top span:last-child {
    font-size: 11px;
  }

  .center-bottom {
    font-size: 11px;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
