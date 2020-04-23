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
  },

  //添加token
  addToken(state, payload) {
    state.Authorization = payload.Authorization.token;
    state.username = payload.Authorization.username;
    localStorage.setItem('Authorization', payload.Authorization.token);
    localStorage.setItem('username', payload.Authorization.username);
  },

  //收藏
  //添加收藏
  addFavCommit(state, payload) {
    payload.checked = true;
    state.favlist.push(payload)
  },

  //取消收藏
  delFavCommit(state, payload) {
    // let result = state.favlist.filter(payload => payload.checked !== true);
    //
    // if (result.length === 0) {
    //   state.favlist = []
    // }else {
    //   state.favlist = result
    // }
    // state.favlist.forEach(item => {
    //   if (item.goodid === payload.goodid) {
    //     state.favlist.remove(item)
    //   }
    // })
    for (let i = 0; i < state.favlist.length; i++) {
      if (state.favlist[i].goodid === payload.goodid) {
        state.favlist.splice(i, 1)
      }
    }
  },

  showFavsCommit(state, payload) {
    state.favlist = payload
  },

  defSomeFavCommit(state, payload) {
    let result = state.favlist.filter(item => item.checked !== true);

    if (result.length === 0) {
      state.favlist = []
    }else {
      state.favlist = result
    }
  },

  changeFavCommit(state, payload) {
    for (let item of state.favlist) {
      if (item.goodid === payload.goodid) {
        item.checked = !item.checked;
      }
    }
  },

  changeAllCommit(state, payload) {
    // state.favList.forEach(item => item.checked = false)
    for (let item of state.favlist) {
      item.checked = false
    }
  },

  changeAllTrueCommit(state, payload) {
    // state.favList.forEach(item => item.checked = true)
    for (let item of state.favlist) {
      item.checked = true
    }
  },

  //签到
  addSignCommit(state, payload) {
    state.signobj.isSign = true;
    state.signobj.isStart = 1;
  },
  addlotteryCommit(state, payload) {
    state.signobj.isStart = 2;
  },
  flushSingCommit(state, payload) {
    state.signobj.monthSignList = payload.signlists;
    state.signobj.isSign = payload.isSign;
    if (payload.isLottery) {
      state.signobj.isStart = 2;
    }else {
      state.signobj.isStart = 0;
    }
  },
  addressToCommit(state, payload) {
    state.addressEdit = payload;
  },
  changeAddressSwitchCommit(state, payload) {
    state.addressEdit.value = !state.addressEdit.value
  },
  addAddressActionsCommit(state, payload) {
    state.addressList.push(payload)
  },
  setAddressListActionsCommit(state, payload) {
    state.addressList = payload;
  },
  delAddressListActionsCommit(state, payload) {
    state.addressList.splice(payload, 1);
  },
  updateAddressListActionsCommit(state, payload) {
    let index = payload.index;
    state.addressList.splice(index, 1);
    delete payload.index;
    state.addressList.push(payload)
  }
}
