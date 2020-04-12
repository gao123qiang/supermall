export default {
  //获取加入购物车商品的数量
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  }
}
