import request from './request'

export function getDetailSlide(shopId) {
  return request({
    url: '/upload/detail',
    params: {
      shopId
    }
  })
}

export function getShopInfo(goodId) {
  return request({
    url: '/goods/shopinfo',
    params: {
      goodId
    }
  })
}

export function getGoodComments(goodId) {
  return request({
    url: '/ours/getcoms/',
    params: {
      goodId
    }
  })
}

export function getRecomonds(goodId) {
  return request({
    url: '/goods/detailRec/',
    params: {
      goodId
    }
  })
}

//请求产品规格参数的接口
export function getGoodSpecs(goodId) {
  return request({
    url: '/goods/goodspecs/',
    params: {
      goodId
    }
  })
}

//整合数据，创建一个对象
export class GoodsInfo {
  constructor(busensures, single) {
    this.busensures = busensures;
    this.single = single;
  }
}

export class ShopInfo {
  constructor(shopinfo, shoopratings) {
    this.shopinfo = shopinfo;
    this.shoopratings = shoopratings
  }
}

export class commentsInfo {
  constructor(comments, comcount, goodid) {
    this.comments = comments;
    this.comcount = comcount;
    this.goodid = goodid;
  }
}

