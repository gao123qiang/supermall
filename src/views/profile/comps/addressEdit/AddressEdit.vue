<template>
    <div class="address-edit">
      <nav-bar class="address-edit-nav">
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <span>添加收货地址</span>
        </div>
        <div slot="right" class="right" @click="addressSaveClick">
          <span>保存</span>
        </div>
      </nav-bar>
      <div class="address-edit-content">
        <div class="address-message">
          <input type="text" placeholder="收货人" v-model="username">
          <input type="tel" placeholder="手机号码" v-model="phone">
          <el-cascader :options="options"
                       v-model="selectedOptions"
                       @change="addressChangeClick"
                       size="small">
          </el-cascader>
          <textarea placeholder="详细地址" v-model="detailAddress"></textarea>
        </div>
      </div>
      <div class="address-edit-bottom">
        <div class="address-switch">
          <span>默认收货地址</span>
          <el-switch v-model="value"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     :width="35"
                     @change="addressSwitch"></el-switch>
        </div>
        <div class="address-del" v-show="false">
          <p>删除此地址</p>
        </div>
      </div>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { regionData, CodeToText, TextToCode } from 'element-china-area-data'

  import { mapGetters, mapActions } from 'vuex'

  import { axiosAddAddress } from "network/address";

  export default {
    name: "AddressEdit",
    data() {
      return {
        username: '',
        phone: '',
        options: regionData,
        selectedOptions: [],
        detailAddress: '',
        value: true,
        selectAddress: ''
      }
    },
    components: {
      NavBar
    },
    computed: {
      ...mapGetters(['getAddressTo'])
    },
    methods: {
      ...mapActions(['changeAddressSwitch', 'addAddressActions']),

      backClick() {
        this.$router.back()
      },
      addressChangeClick(arr) {
        this.selectAddress = CodeToText[arr[0]] + ' ' + CodeToText[arr[1]] + ' ' + CodeToText[arr[2]]
      },
      addressSwitch(value) {
        this.value = value;
      },
      addressSaveClick() {
        if (!this.username && !this.phone && !this.detailAddress && !this.selectAddress) {
          this.$toast.toastShow("参数不能为空");
          return
        }

        const obj = {
          username: this.username,
          phone: this.phone,
          detailAddress: this.detailAddress,
          selectAddress: this.selectAddress,
          value: this.value
        };
        axiosAddAddress(obj).then(res => {
          if (res.status === 200) {
            let id = res.id;
            obj['id'] = id;
            // obj['title'] = "编辑收货地址";
            this.addAddressActions(obj);
            this.$toast.toastShow("添加成功");

            setTimeout(() => {
              this.$router.back()
            }, 500);
          }else {
            this.$toast.toastShow("请稍后再试")
          }
        }).catch(error => {
          this.$toast.toastShow("请稍后再试")
        })
      }
    }
  }
</script>

<style scoped>
  .address-edit {
    position: relative;
    z-index: 9;
    background-color: #f0fff0;
    height: 100vh;
  }

  .address-edit-nav {
    background-color: #ffff77;
  }

  .back {
    height: 100%;
  }

  .back img {
    margin-top: 10px;
  }

  .title {
    font-weight: 700;
  }

  .right {
    font-size: 12px;
    color: red;
  }

  input::placeholder {
    font-size: 12px;
    color: #aaa;
  }

  .address-message {
    width: 100%;
    padding: 2% 0 5% 0;
  }

  .address-message input {
    width: 100%;
    padding: 4% 0 4% 5%;
    font-size: 12px;
    color: black;
    border: 0;
    border-radius: 4px;
    border-bottom: 1px solid #c3c3c5;
    margin-bottom: 10px;
    transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -webkit-transition: all 0.3s ease 0s;
    height: 32px;
  }

  textarea::placeholder {
    font-size: 12px;
    color: #aaa;
  }

  .address-message textarea {
    padding: 3px 5px 3px 15px;
    border: 0;
    border-radius: 4px;
    width: 100%;
    border-bottom: 1px solid #c3c3c5;
    outline: none;
    font-size: 12px;
    color: black;
    height: 50px;
  }

  .address-switch {
    width: 100%;
    height: 40px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: space-between;
  }

  .address-switch span {
    font-size: 12px;
    color: #aaa;
  }

  .address-del {
    width: 30%;
    margin: 10px 0 0 10px;
  }

  .address-del p {
    font-size: 13px;
    color: red;
  }
</style>

<style>
  .el-cascader {
    width: 100%;
    margin-bottom: 10px;
  }

  .el-cascader-menu__list {
    font-size: 12px;
  }

  .el-input::placeholder {
    font-size: 12px;
  }
</style>
