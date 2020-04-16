import request from './request'

export function addToCart(goodid, color, size, count) {
  return request({
    url: '/trade/addcart/',
    method: 'post',
    data: {
      goodid,
      color,
      size,
      count
    }
  })
}

export function getCartData() {
  return request({
    url: '/trade/getcart/'
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
