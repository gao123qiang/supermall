import request from './request'

export function Login(userlogin) {
  return request({
    url: '/ours/login/',
    method: 'post',
    data: {
      userlogin
    }
  })
}
