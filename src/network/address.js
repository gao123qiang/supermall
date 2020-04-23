import request from './request'

export function axiosAddAddress(message) {
  return request({
    url: '/ours/addAddress/',
    method: 'post',
    data: {
      message
    }
  })
}

export function axiosGetAddress() {
  return request({
    url: '/ours/getaddress/'
  })
}

export function axiosDelAddress(id) {
  return request({
    url: '/ours/deladdress/',
    method: 'post',
    data: {
      id
    }
  })
}

export function axiosUpdateAddress(message) {
  return request({
    url: '/ours/updateaddress/',
    method: 'post',
    data: {
      message
    }
  })
}
