<template>
    <div class="content">
      <div class="content-item" v-for="(item, index) in getAddressList">
        <div class="left">
          <div class="left-quan">
            <span>{{nameFenGe(item.username)}}</span>
          </div>
        </div>
        <div class="center">
          <div class="center-top">
            <span class="name">{{item.username}}</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="center-bottom">
            <span>{{addressHeBing(item.selectAddress, item.detailAddress)}}</span>
          </div>
        </div>
        <div class="right" @click="changeAddressClick(index)">
          <p>编辑</p>
        </div>
      </div>
    </div>
</template>

<script>
  import { axiosGetAddress } from "network/address";

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "addressContent",
    data() {
      return {
        addresslist: []
      }
    },
    created() {
      //获取地址数据
      this.axiosGetAddressCreate();
    },
    computed: {
      ...mapGetters(['getAddressList']),

      nameFenGe() {
        return function (username) {
          return username[0]
        }
      },
      addressHeBing() {
        return function (select, detail) {
          return select + ' ' + detail;
        }
      }
    },
    methods: {
      ...mapActions(['setAddressListActions']),

      axiosGetAddressCreate() {
        axiosGetAddress().then(res => {
          if (res.status === 200) {
            this.setAddressListActions(res.addresslist);
          }else{
            this.$toast.toastShow("您还没有添加地址")
          }
        }).catch(error => {
          this.$toast.toastShow("请稍后再试")
        })
      },
      changeAddressClick(index) {
        this.$router.push({
          path: '/profile/address/change',
          query: {
            index
          }
        })
      }
    }
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
