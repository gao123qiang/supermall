import request from './request'

export function getComments(goodid, page) {
  return request({
    url: '/ours/getpagecoms/',
    params: {
      goodid,
      page
    }
  })
}
