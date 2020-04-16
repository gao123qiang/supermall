import request from './request'

export function changePwd(changeinfo) {
  return request({
    url: '/ours/cpwd/',
    method: 'post',
    data: {
      changeinfo
    }
  })
}
