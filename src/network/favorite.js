import request from './request'

export function axiosAddFav(goodid) {
  return request({
    url: '/trade/addfav/',
    method: 'post',
    data: {
      goodid
    }
  })
}

export function axiosDelFav(goodid) {
  return request({
    url: '/trade/delfav/',
    method: 'post',
    data: {
      goodid
    }
  })
}

export function axiosGetFavs() {
  return request({
    url: '/trade/getfav/'
  })
}

export function axiosDelFavs(ids) {
  return request({
    url: '/trade/delfavs/',
    method: 'post',
    data: {
      ids
    }
  })
}
