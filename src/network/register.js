import request from './request'

export function Register(userinfo) {
  return request({
    url: '/ours/register/',
    method: 'post',
    data: {
      userinfo
    }
  })
}
