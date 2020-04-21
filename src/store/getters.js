export default {
  //获取加入购物车商品的数量
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  //获取token
  getToken(state) {
    return state.Authorization;
  },
  getUserName(state) {
    return state.username;
  },
  //收藏
  favLength(state) {
    return state.favlist.length;
  },
  favList(state) {
    return state.favlist
  },

  //签到
  getisSign(state) {
    return state.signobj.isSign;
  },
  getisLottery(state) {
    return state.signobj.isStart;
  },
  getSignList(state) {
    return state.signobj.monthSignList;
  },
  getSignLength(state) {
    return state.signobj.monthSignList.length;
  }
}
