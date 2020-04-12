export default {
  addCount(state, payload) {
    payload.count++;
  },
  addToCart(state, paylaod) {
    paylaod.checked = true;
    state.cartList.push(paylaod);
  },
  showData(state, payload) {
    state.cartList = payload;
  },
  mulCartCount(state, payload) {
    state.cartList.forEach(item => {
      if (item.id === payload) {
        if (item.count > 1) {
          item.count -= 1;
        }
      }
    })
  },
  addCartCount(state, payload) {
    state.cartList.forEach(item => {
      if (item.id === payload) {
        item.count += 1;
      }
    })
  },
  //删除购物车数据
  delCart(state, payload) {
    let result = state.cartList.filter(item => item.checked !== true);

    if (result.length === 0) {
      state.cartList = [];
    }else {
      state.cartList = result;
    }
  }
}
