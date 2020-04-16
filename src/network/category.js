import request from './request'

export function getCates() {
  return request({
    url: '/goods/goodcate/'
  })
}

export function getCateDetails(cateId, page) {
  return request({
    url: '/goods/catedetail/',
    params: {
      cateId,
      page
    }
  })
}
