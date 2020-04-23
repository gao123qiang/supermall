
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
  },
  changeLogin(context, payload) {
    context.commit('addToken', payload)
  },
  //收藏
  //添加收藏
  addFav(context, payload) {
    return new Promise((resolve, reject) => {
      if (payload) {
        context.commit('addFavCommit', payload);
        resolve("添加成功")
      }else {
        reject("添加失败")
      }
    })
  },
  //取消收藏
  delFav(context, payload) {
    context.commit("delFavCommit", payload)
  },
  //删除收藏
  delSomeFav(context, paylaod) {
    context.commit('defSomeFavCommit')
  },
  //添加所有收藏的商品
  showFavs(context, payload) {
    context.commit('showFavsCommit', payload)
  },
  //改变状态
  changeFav(context, payload) {
    context.commit("changeFavCommit", payload)
  },
  changeAllFav(context, payload) {
    context.commit('changeAllCommit')
  },
  changeAllTrue(context, payload) {
    context.commit('changeAllTrueCommit')
  },

  //签到
  addSign(context, payload) {
    context.commit('addSignCommit', payload)
  },
  addlottery(context, payload) {
    context.commit('addlotteryCommit', payload)
  },
  flushSing(context, payload) {
    context.commit('flushSingCommit', payload)
  },

  //收货地址跳转参数
  addressTo(context, payload) {
    context.commit('addressToCommit', payload)
  },
  changeAddressSwitch(context, payload) {
    context.commit('changeAddressSwitchCommit')
  },
  addAddressActions(context, payload) {
    context.commit('addAddressActionsCommit', payload)
  },
  //我的地址页面刷新时
  setAddressListActions(context, payload) {
    context.commit('setAddressListActionsCommit', payload)
  },
  //删除我的地址
  delAddressListActions(context, payload) {
    context.commit('delAddressListActionsCommit', payload)
  },
  //更新我的地址
  updateAddressListActions(context, payload) {
    context.commit('updateAddressListActionsCommit', payload)
  }
}
