<template>
    <div class="fav-list-info">
      <scroll class="scroll-height" ref="scroll">
        <div class="fav-item" v-for="(item, index) in favList">
          <div class="item-selector">
            <check-button :value="item.checked"
                          @click.native="checkedChange(item)"></check-button>
          </div>
          <div class="item-img">
            <img :src="item.image" alt="">
          </div>
          <div class="item-info">
            <div class="item-title">{{item.name}}</div>
            <div class="item-price">￥ {{item.price}}</div>
          </div>
        </div>
      </scroll>
      <!--底部的删除导航栏-->
      <div class="fav-bottom-bar" v-show="isShow">
        <div class="fav-bottom-check">
          <!--<van-checkbox class="checked-all">-->
          <!--全选-->
          <!--</van-checkbox>-->
          <check-button :value="isSelectAll" @click.native="changeAll"></check-button>
          <p>全选</p>
        </div>
        <div>
          <div class="fav-bottom-btn">
            <button @click="delFavsClick">删除({{checkLength}})</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CheckButton from '../../cart/childComps/CheckButton'

  import {axiosDelFavs} from "network/favorite";

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "FavListinfo",
    data() {
      return {
        isShow: false
      }
    },
    components: {
      Scroll,
      CheckButton
    },
    created() {
      //上面的按钮回到初始的位置
      this.isShowChange();
    },
    activated() {
      this.$refs.scroll.refresh();
    },
    computed: {
      ...mapGetters(['favList', 'favLength']),

      isSelectAll() {
        if (this.favLength === 0) {
          return false
        }
        return !this.favList.find(item => !item.checked)
      },
      checkLength() {
        return this.favList.filter(item => item.checked).length
      }
    },
    methods: {
      ...mapActions(['delSomeFav', 'changeFav', 'changeAllFav', 'changeAllTrue']),

      checkedChange(item) {
        // item.checked = !item.checked
        this.changeFav(item)
      },
      changeAll() {
        console.log(this.isSelectAll);
        if (this.isSelectAll) {
          // this.favList.forEach(item => item.checked = false)
          this.changeAllFav();
        }else {
          // this.favList.forEach(item => item.checked = true)
          this.changeAllTrue();
        }
      },
      isShowChange() {
        this.isShow = false
      },
      delFavsClick() {
        if (this.checkLength === 0) {
          this.$toast.toastShow("您还没有选中要删除的藏品")
        }else {
          let ids = [];
          this.favList.filter(item => {
            if (item.checked) {
              ids.push(item.id)
            }
          });
          //服务器删除和vuex中删除
          axiosDelFavs(ids).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.delSomeFav();
              this.$toast.toastShow("删除成功")
            }else {
              this.$toast.toastShow("服务器繁忙")
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .fav-list-info {
    width: 100%;
    height: 100%;
  }

  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
  }

  .fav-item {
    display: flex;
    width: 100%;
    padding: 5px;
    background-color: #ffffff;
    margin: 10px 0;
    box-shadow: 0 -3px 3px #888888;
  }

  /*.fav-item:last-child {*/
    /*border-bottom: 0;*/
  /*}*/

  .item-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12%;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
  }

  .item-info {
    font-size: 14px;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    overflow: hidden;
    width: 88%;
    padding: 5px 10px;
    color: #333333;
  }

  .item-title {
    overflow: hidden;
    height: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
  }

  .item-price {
    color: red;
  }

  .fav-bottom-bar {
    font-size: 15px;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-top: 1px solid #cccccc;
  }

  .fav-bottom-check {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .fav-bottom-check p {
    font-size: 12px;
    margin-left: 5px;
  }

  .fav-bottom-btn button{
    line-height: 50px;
    width: 30%;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    height: 50px;
    padding: 0 15px;
    color: white;
    border: 0;
    outline: none;
    background: linear-gradient(to right, #ff6034, #ee0a24);
    font-size: 14px;
  }

  .fav-bottom-btn button:active {
    opacity: 0.8;
  }
</style>
