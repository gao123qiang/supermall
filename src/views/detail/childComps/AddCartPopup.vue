<template>
    <div class="cart-popup">
      <el-dialog :visible.sync="dialogCartVisible_"
                  width="100%"
                  :modal="false"
                  title="产品规格选择"
                  top="5vh"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :destroy-on-close="false"
                  @close="closeDialog">
        <div class="cart-popup-top">
          <el-image class="top-image"
                    :src="product_.image"
                    >
          </el-image>
          <div class="top-shuoming">
            <span class="top-price">￥{{product_.price}}</span>
            <span class="top-ku">库存10000件</span>
            <span class="top-gui">选择 颜色分类 尺码</span>
          </div>
        </div>
        <div class="center">
          <div class="color-type">
            <span class="spce-font">颜色分类</span>
            <el-radio-group v-if="product_.specs !== undefined && product_.specs[0].goodcolor.length !== 0"
                            size="mini"
                            :text-color="textColor"
                            :fill="fill"
                            v-model="radioColor"
                            @change="changeColorTheme"
                            >
              <el-radio-button name="color" v-for="(item, index) in product_.specs[0].goodcolor" :label="color[item - 1]" :key="index"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="size-type">
            <span class="spce-font">尺寸分类</span>
            <el-radio-group v-if="product_.specs !== undefined && product_.specs[0].goodsize.length !== 0"
                            size="mini"
                            :text-color="textColor"
                            :fill="fill"
                            v-model="radioSize"
                            @change="changeSizeTheme">
              <el-radio-button name="size" v-for="(item, index) in product_.specs[0].goodsize" :label="size[item - 1]" :key="index"></el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="cartPopupSure">确 定</el-button>
        </div>

      </el-dialog>
    </div>
</template>

<script>
  import {addToCart} from "network/cart";

  export default {
    name: "AddCartPopup",
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      },
      dialogCartVisible: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        base_root: "http://127.0.0.1:8000/media",
        size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
        color: ['红色', '橙色', '黄色', '绿色', '蓝色', '紫色', '白色', '黑色', '灰色'],
        fill: "#CCCCCC",
        textColor: "#ffffff",
        radioColor: '',
        radioSize: ''
      }
    },
    computed: {
      imageUrl() {
        return function (imageurl) {
          return this.base_root + "/" + imageurl;
        }
      },
      product_: {
        get() {
          return this.product
        },
        set(val) {

        }
      },
      dialogCartVisible_: {
        get() {
          return this.dialogCartVisible
        },
        set(val) {

        }
      }
    },
    mounted() {

    },
    methods: {
      changeColorTheme(value) {
        // console.log(value);

      },
      changeSizeTheme(value) {
        // console.log(value);
      },
      closeDialog() {
        this.radioColor = '';
        this.radioSize = '';
        this.$emit("close-dialog")
      },
      cartPopupSure() {
        if (this.product_.specs[0].goodcolor.length !== 0 && this.radioColor.length === 0) {
          this.$notify({
            title: '错误',
            message: '请选择适合的颜色',
            type: 'error',
            position: 'top-left',
            offset: 50,
          });
          return
        }

        if (this.product_.specs[0].goodsize.length !== 0 && this.radioSize.length === 0) {
          this.$notify({
            title: '错误',
            message: '请选择合适的尺寸',
            type: 'error',
            position: 'top-left',
            offset: 50,
          });
          return
        }

        //1.将购物车需要的数据包装到一个对象中，存入vuex中
        const obj = {};
        obj.goodid = this.product.goodid;
        obj.image = this.product.image;
        obj.price = this.product.price;
        obj.name = this.product.name;

        obj.color = this.radioColor;
        obj.size = this.radioSize;

        // this.$store.commit('addCart', obj);

        //添加到数据库
        let userid = 1;
        let count = 1;
        //添加购物车，向服务器提交数据
        addToCart(userid, this.product.goodid, this.radioColor, this.radioSize, count).then(res => {
          if (res.status === 200) {
            //下面使用vuex存入
            this.$store.dispatch('addCart', obj).then(res => {
              this.$toast.toastShow(res, 3000);
            }).catch(() => {
              this.$toast.toastShow("商品添加失败");
            });
          }else {
            this.$toast.toastShow("购物车添加失败");
          }
        });

        //要显示添加成功
        //2.将dialog进行关闭，一些参数进行删除
        this.$emit("close-dialog")
      }
    }
  }
</script>

<style scoped>
  .cart-popup-top {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #f4f4f4;
  }

  .top-image {
    width: 150px;
    height: 120px;
  }

  .top-shuoming {
    margin: 10px 0 0 10px;
    display: flex;
    flex-direction: column;
  }

  .top-price {
    font-size: 20px;
    color: red;
    margin-bottom: 10px;
  }

  .top-ku {
    font-size: 14px;
    color: #999999;
    margin-bottom: 10px;
  }

  .top-gui {
    font-size: 15px;
    font-weight: 600;
  }

  .center {
    margin-top: 10px;
  }

  .spce-font {
    width: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
    font-family: "华文宋体";
    margin-bottom: 10px;
  }

  .dialog-bottom {
    background-color: #ffffff;
  }

</style>

<style>
  .el-dialog {
    display: flex;
    flex-direction: column;
    max-height: calc(100% - 130px);
  }

  .el-dialog__body{
    padding: 5px 10px!important;
  }

  .el-dialog__header {
    padding: 10px 10px!important;
    border-bottom: 1px solid #f4f4f4;
  }

  .el-dialog__title {
    font-size: 16px!important;
    color: black;
  }

  .el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 24px!important;
  }

  .el-radio-button {
    margin-left: 10px;
    margin-bottom: 3px;
    border-radius: 5%;
  }

  .el-dialog__footer {
    background-color: #ffffff;
    height: 52px;
  }

  /*.dialog-footer {*/
    /*width: 80%;*/
  /*}*/

  .el-button {
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0;
  }

  .el-notification {
    width: 80%;
  }

  .el-notification__title {
    font-size: 14px;
    font-weight: 600;
  }

  .el-notification__content {
    font-size: 12px;
  }
</style>
