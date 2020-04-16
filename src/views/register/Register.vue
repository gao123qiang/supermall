<template>
    <div id="register">
      <div class="register-head">
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div class="register">
          <span>注<i/>册</span>
        </div>
      </div>
      <div class="register-content">
        <div class="point">
          <span>注册成功后，用户名和手机号都可以登录</span>
        </div>
        <div class="message">
          <input type="text" placeholder="请输入用户名" v-model="username" v-verify="username">
          <label v-remind="username"></label>
          <input type="tel" placeholder="请输入手机号" v-model="phone" v-verify="phone">
          <label for="" v-remind="phone"></label>
          <input type="password" placeholder="请输入密码" v-model="password" v-verify="password">
          <label for="" v-remind="password"></label>
          <input type="password" placeholder="请再次输入密码" v-model="againPassword" v-verify="againPassword">
          <label for="" v-remind="againPassword"></label>
          <input type="text" placeholder="请输入验证码" v-model="code" v-verify="code">
          <label for="" v-remind="code"></label>
          <div class="icons">
            <b><img src="~assets/img/register/zc-1.jpg" alt=""></b>
            <b><img src="~assets/img/register/zc-1.jpg" alt=""></b>
            <b><img src="~assets/img/register/zc-3.jpg" alt=""></b>
            <b><img src="~assets/img/register/zc-3.jpg" alt=""></b>
            <b><img src="~assets/img/register/zc-2.jpg" alt=""></b>
          </div>
        </div>
        <span class="code">获取验证码</span>
      </div>
      <div class="agree">
        <input type="checkbox" v-model="isChecked">
        <span>同意&nbsp;注册协议</span>
      </div>
      <div class="submit">
        <button @click="registerClick">注<i/>册</button>
      </div>
    </div>
</template>

<script>
  import {Register} from "network/register";

  export default {
    name: "Register",
    data() {
      return {
        username: '',
        phone: '',
        password: '',
        againPassword: '',
        code: '',
        isChecked: false,
      }
    },
    verify: {
      username: [
        'required',
        {
          minLength: 2,
          message: "姓名不得小于2位"
        },
        {
          maxLength: 5,
          message: "姓名不得大于5位"
        }
      ],
      phone: ['required', 'mobile'],
      password: [
        'required',
        {
          minLength: 6,
          message: "密码在6-16位之间"
        },
        {
          maxLength: 16,
          message: "密码在6-16位之间"
        }
      ],
      againPassword: [
        'required', {
        test: function (val) {
          if (this.password !== val) {
            return false
          }
          return true
        },
          message: "密码与上面的密码不同"
        }],
      code: ['required']
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      registerClick() {
        if (!this.isChecked) {
          this.$toast.toastShow("要同意注册协议");
          return
        }

        if (this.$verify.check()) {
          const obj = {
            "username": this.username,
            "phone": this.phone,
            "password": this.password,
            "againpassword": this.againPassword,
            "code": this.code
          };

          Register(obj).then(res => {
            if (res.status === 200) {
              this.$toast.toastShow("注册成功");
              //跳转到登陆页
              setTimeout(() => {
                this.$router.push('/login')
              }, 500)
            }else if (res.status === 304) {
              this.$toast.toastShow("此用户已经存在");
            }else {
              this.$toast.toastShow("输入参数有误");
            }
          })
        }else {
          this.$toast.toastShow("填写信息有误");
        }
      }
    }
  }
</script>

<style scoped>
  #register {
    height: 100vh;
    position: relative;
    z-index: 23;
    background: white;
    font-family: "Microsoft YaHei";
    overflow: hidden;
  }

  .register-head {
    width: 100%;
    height: 44px;
    padding: 3px 10px 3px 10px;
    background: #50b4f9;
    color: white;
    display: flex;
    align-items: center;
  }

  .register span{
    font-size: 18px;
    margin-left: 100px;
  }

  .register span i {
    padding: 0 10px;
  }

  .point {
    padding: 6% 5%;
    font-size: 14px;
    font-weight: 700;
    background: #eee;
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

  .message input {
    width: 90%;
    padding: 4% 0 4% 10%;
    font-size: 13px;
    color: orange;
    border: 0;
    border-bottom: 1px solid #c3c3c5;
  }

  .message label {
    font-size: 10px;
    color: red;
    display: block;
    padding-top: 1px;
  }

  .message .icons b {
    position: absolute;
    width: 3.75%;
    height: 4%;
    top: 7%;
    left: 7%;
  }

  .icons b img {
    width: 100%;
  }

  .icons b:nth-child(2){
    /*width: 5%;*/
    top: 26%;
    /*left: 6%;*/
  }

  .icons b:nth-child(3){
    top: 47%;
  }

  .icons b:nth-child(4){
    top: 66%;
  }

  .icons b:nth-child(5){
    width: 5%;
    top: 87%;
    left: 6%;
  }

  .code {
    position: absolute;
    top: 54%;
    right: 12%;
    color: #21a9f5;
    font-size: 14px;
  }

  .agree {
    margin: 6% 8%;
    height: 26px;
    display: flex;
    align-items: center;
  }

  .agree span {
    margin-left: 10px;
    color: #21a9f5;
    font-size: 14px;
    font-weight: 600;
  }

  .agree input[type="checkbox"] :default{
    outline: 2px solid #21a9f5;
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
