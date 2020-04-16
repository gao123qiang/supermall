<template>
  <div id="forget">
    <div class="forget-head">
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="forget">
        <span>忘&nbsp;记&nbsp;密&nbsp;码</span>
      </div>
    </div>
    <div class="forget-content">
      <div class="message">
        <input type="tel" placeholder="请输入手机号" v-model="phone" v-verify="phone">
        <label for="" v-remind="phone"></label>
        <input type="text" placeholder="请输入验证码" v-model="code" v-verify="code">
        <label for="" v-remind="code"></label>
        <input type="password" placeholder="请输入密码" v-model="password" v-verify="password">
        <label for="" v-remind="password"></label>
        <input type="password" placeholder="请再次输入密码" v-model="cpassword" v-verify="cpassword">
        <label for="" v-remind="cpassword"></label>
        <div class="icons">
          <b><img src="~assets/img/register/zc-1.jpg" alt=""></b>
          <b><img src="~assets/img/register/zc-2.jpg" alt=""></b>
          <b><img src="~assets/img/register/zc-3.jpg" alt=""></b>
          <b><img src="~assets/img/register/zc-3.jpg" alt=""></b>
        </div>
      </div>
      <span class="code">获取验证码</span>
    </div>
    <div class="submit">
      <button @click="changePwdClick">提<i/>交</button>
    </div>
  </div>
</template>

<script>
  import {changePwd} from "network/changepwd";

  export default {
    name: "NewPassword",
    data() {
      return {
        phone: '',
        code: '',
        password: '',
        cpassword: '',
      }
    },
    verify: {
      phone: ['required', 'mobile'],
      code: ['required'],
      password: [
        'required',
        {
          minLength: 6,
          message: "密码不得小于6位"
        },
        {
          maxLength: 16,
          message: "密码不得大于16位"
        }
      ],
      cpassword: [
        'required', {
        test: function (val) {
          if (this.password !== val) {
            return false
          }
          return true
        },
          message: '两次密码不一致'
        }
      ]
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      changePwdClick() {
        if (this.$verify.check()) {

          const obj = {
            phone: this.phone,
            code: this.code,
            password: this.password,
            cpassword: this.cpassword
          };

          changePwd(obj).then(res => {
            if (res.status === 200) {
              this.$toast.toastShow("密码修改成功")

              setTimeout(() => {
                this.$router.push('/home')
              }, 500)
            } else if (res.status === 304) {
              this.$toast.toastShow("输入的手机号没有注册")
            }else {
              this.$toast.toastShow("参数有误，请稍后再修改")
            }
          }).catch(error => {
            this.$toast.toastShow("修改出错，请稍后再试")
          })

        }else {
          this.$toast.toastShow("参数有误，请重新填写")
        }
      }
    }
  }
</script>

<style scoped>
  #forget {
    height: 100vh;
    position: relative;
    z-index: 23;
    background: #eee;
    font-family: "Microsoft YaHei";
  }

  .forget-head {
    width: 100%;
    height: 44px;
    padding: 3px 10px 3px 10px;
    background: #50b4f9;
    color: white;
    display: flex;
    align-items: center;
  }

  .forget span{
    font-size: 18px;
    margin-left: 85px;
  }

  input::placeholder {
    font-size: 12px;
    color: green;
  }

  .message {
    width: 100%;
    height: 35.12%;
    padding: 2% 5% 0 5%;
    position: relative;
    margin: 30px 10px;
  }

  .message label {
    font-size: 10px;
    color: red;
    display: block;
    padding: 2px 0;
  }

  .message input {
    width: 83%;
    padding: 4% 0 4% 10%;
    margin: 4% 4%;
    font-size: 12px;
    color: orange;
    /*border: 0;*/
    /*border-bottom: 1px solid #c3c3c5;*/
  }

  .message .icons b {
    position: absolute;
    width: 3%;
    height: 4%;
    top: 11%;
    left: 11%;
  }

  .icons b img {
    width: 100%;
  }

  .icons b:nth-child(2){
    width: 4.5%;
    top: 36.5%;
    left: 10.5%;
  }

  .icons b:nth-child(3){
    width: 3.5%;
    top: 61%;
  }

  .icons b:nth-child(4){
    width: 3.5%;
    top: 85%;
  }

  .code {
    position: absolute;
    top: 27.2%;
    right: 13.5%;
    background: #21a9f5;
    color: #ffffff;
    padding: 3.635% 5%;
    height: 40.63px;
  }

  .submit {
    width: 100%;
    height: 60px;
    padding: 5px 10px;
  }

  .submit button {
    width: 100%;
    display: block;
    padding: 3% 0;
    background-color: #50b4f9;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    box-shadow: #8f9bad 0 0 10px;
    border-radius: 10px;
    font-weight: 700;
  }

  .submit i {
    padding: 0 20px;
  }

</style>
