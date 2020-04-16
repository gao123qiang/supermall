<template>
    <div id="login">
      <div class="login-bg">
        <div class="login-head">
          <div class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div class="register">
            <button @click="registerClick">注&nbsp;册</button>
          </div>
        </div>
        <div class="logo">
          <img src="~assets/img/login/denglu.jpg" alt="">
        </div>
        <div class="login-content">
          <div class="userName">
            <label for="user">用户名：</label>
            <input type="text" placeholder="请输入用户名" id="user" v-model="username" v-verify="username">
          </div>
          <label for="" v-remind="username" class="verify"></label>
          <div class="passWord">
            <label for="pass">密<i></i>码：</label>
            <input type="password" placeholder="请输入密码" id="pass" v-model="password" v-verify="password">
          </div>
          <label for="" v-remind="password" class="verify"></label>
          <div class="forget" @click="forgetClick">
            <p>忘记密码</p>
          </div>
          <div class="sure">
            <button @click="loginClick">登<i/>录</button>
          </div>
        </div>
        <div class="other-login">
          <div class="other"></div>
          <span>其他方式登录</span>
          <div class="other"></div>
        </div>
        <div class="other-choose">
          <div class="qq choose">
            <img src="~assets/img/login/qq.png" alt="">
          </div>
          <div class="weixin choose">
            <img src="~assets/img/login/wx.png" alt="">
          </div>
          <div class="weibo choose">
            <img src="~assets/img/login/wb.png" alt="">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {Login} from "network/login";

  import { mapActions } from 'vuex'

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    verify: {
      username: ['required'],
      password: ['required']
    },
    methods: {
      ...mapActions(['changeLogin']),

      backClick() {
        this.$router.back()
      },
      registerClick() {
        this.$router.push({
          path: '/register'
        })
      },
      forgetClick() {
        this.$router.push({
          path: '/forget'
        })
      },
      loginClick() {
        if (this.$verify.check()) {
          const userobj = {
            username: this.username,
            password: this.password
          };

          Login(userobj).then(res => {
            if (res.status === 200) {
              let token = res.token;
              let username = res.username;

              const obj = {
                "token": token,
                "username": username
              };
              //存入token
              this.changeLogin({Authorization: obj});

              setTimeout(() => {
                this.$router.push('/home')
              }, 500)
            }else {
              this.$toast.toastShow("账号密码错误")
            }
          }).catch(error => {
            this.$toast.toastShow("账号密码错误")
          })

        }else {
          this.$toast.toastShow("参数不能为空");
        }
      }
    }
  }
</script>

<style scoped>
  #login {
    position: relative;
    z-index: 20;
    height: 100vh;
    font-family: "Microsoft YaHei";
  }

  .login-all {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("~assets/img/login/bj.png") no-repeat;
    background-size: 100%;
    z-index: 21;
    top: 0;
    left: 0;
    opacity: 0.35;
  }

  .login-bg {
    width: 100%;
    min-height: 100%;
    background: #e0ebf4;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  button {
    border: none;
    outline: none;
  }

  .login-head {
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
  }

  .verify {
    padding: 3px 0;
    font-size: 10px;
    color: red;
    display: block;
    font-weight: normal;
  }

  .register {
    width: 60px;
    height: 30px;
  }

  .register button {
    width: 100%;
    height: 100%;
    background: #666666;
    border-radius: 5px;
    color: white;
  }

  .logo {
    margin: 9% auto;
    width: 32.25%;
    opacity: 0.8;
  }

  .logo img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .login-content {
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }

  .userName, .passWord {
    border: 1px solid #c1c1c1;
    padding: 3% 0 3% 4%;
    height: 20%;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 5px;
  }

  .userName label, .passWord label {
    font-size: 13px;
    font-weight: 600;
  }

  .userName input, .passWord input {
    width: 68%;
    height: 80%;
    border: none;
    font-size: 14px;
    color: #b3b3b3;
    padding: 2px;
    outline: none;
  }

  .passWord i {
    padding: 0 6px;
  }

  input::placeholder {
    font-size: 12px;
    color: green;
  }

  .forget {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    text-align: right;
    color: red;
    font-size: 13px;
  }

  .sure {
    width: 100%;
    height: 60px;
    padding: 5px 10px;
  }

  .sure button{
    width: 100%;
    display: block;
    padding: 3% 0;
    background-color: #ffffff;
    font-size: 14px;
    color: #374782;
    text-align: center;
    box-shadow: #8f9bad 0 0 20px;
    border-radius: 10px;
  }

  .sure i {
    padding: 0 10px;
  }

  .other-login {
    width: 80%;
    height: 15px;
    position: absolute;
    top: 70%;
    margin: 0 10%;
    font-size: 14px;
  }

  .other, .other-login span {
    display: inline-block;
    vertical-align: middle;
  }

  .other-login .other {
    width: 28%;
    height: 8px;
    border-bottom: 1px solid #2f2c59;
  }

  .other-login span {
    width: 40%;
    text-align: center;
  }

  .other-choose {
    width: 74%;
    top: 77%;
    margin: 0 13%;
    position: absolute;
    display: flex;
    justify-content: space-around;
  }

  .other-choose .choose {
    width: 40px;
    height: 40px;
  }

  .choose img {
    width: 100%;
    height: 100%;
  }

</style>
