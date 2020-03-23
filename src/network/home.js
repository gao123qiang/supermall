import request from './request'

export function getSlideShow() {
  return request({
    url: '/home/slideshow'
  })
}

export function getFeatures() {
  return request({
    url: '/home/featureshow'
  })
}

export function getHomeGoods(type, page) {
  return request(({
    url: '/home/homegoods',
    params: {
      type,
      page
    }
  }))
}
