import request from './request'

export function addToCart(userid, goodid, color, size, count) {
  return request({
    url: '/trade/addcart/',
    method: 'post',
    data: {
      userid,
      goodid,
      color,
      size,
      count
    }
  })
}

export function getCartData(userid) {
  return request({
    url: '/trade/getcart/',
    params: {
      userid
    }
  })
}

export function updateCartCount(id, type) {
  return request({
    url: '/trade/updatecart/',
    method: 'post',
    data: {
      id,
      type
    }
  })
}

export function delCartData(ids) {
  return request({
    url: '/trade/delcart/',
    method: 'post',
    data: {
      ids
    }
  })
}
