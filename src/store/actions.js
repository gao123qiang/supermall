
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let newProduct = null;
      for (let item of context.state.cartList) {
        if (item.goodid === payload.goodid && item.color === payload.color && item.size === payload.size) {
          newProduct = item;
        }
      }

      if (newProduct) {
        // newProduct.count += 1;
        context.commit('addCount', newProduct);
        resolve("已添加此商品，数量加1")
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit('addToCart', payload);
        resolve("新商品添加成功")
      }
    })
  },
  showCartData(context, payload) {
    //将商品添加到Mutations中
    if (context.state.cartList.length === 0) {
      context.commit('showData', payload)
    }
  },
  mulCartData(context, payload) {
    context.commit('mulCartCount', payload)
  },
  addCartData(context, payload) {
    context.commit('addCartCount', payload)
  },
  delCartData(context, payload) {
    context.commit('delCart')
  }
}
