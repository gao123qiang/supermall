import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex);

const state = {
  cartList: [],
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization'): '',
  username: localStorage.getItem('username') ? localStorage.getItem('username'): '',
  favlist: [],
  signobj: {
    isSign: false,
    monthSignList: [],
    isStart: 0
  },
  //收货地址按钮跳转
  addressEdit: {},
  //收货地址列表
  addressList: []
};

//2.插件store对象
const store = new Vuex.Store({
  // state: {
  //   cartList: []
  // },
  //进行了重构和抽离
  state,
  mutations,
  actions,
  getters
  // mutations: {
  //   addCount(state, payload) {
  //     payload.count++;
  //   },
  //   addToCart(state, paylaod) {
  //     state.cartList.push(paylaod);
  //   }
  // },
  // actions: {
  //   addCart(context, payload) {
  //     let newProduct = null;
  //     for (let item of context.state.cartList){
  //       if (item.goodid === payload.goodid && item.color === payload.color && item.size === payload.size) {
  //         newProduct = item;
  //       }
  //     }
  //
  //     if (newProduct) {
  //       // newProduct.count += 1;
  //       context.commit('addCount', newProduct);
  //     }else {
  //       payload.count = 1;
  //       // context.state.cartList.push(payload);
  //       context.commit('addToCart', payload);
  //     }
  //   }
  // }
});

//3.挂载到vue实例上
export default store;

