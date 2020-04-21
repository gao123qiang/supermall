import request from './request'

export function addSign(currentDate) {
  return request({
    url: '/trade/addsign/',
    method: 'post',
    data: {
      currentDate
    }
  })
}

export function addLottery(currentDate, index) {
  return request({
    url: '/trade/addlottery/',
    method: 'post',
    data: {
      currentDate,
      index
    }
  })
}

export function getSign(currentDate) {
  return request({
    url: '/trade/sign/',
    params: {
      currentDate
    }
  })
}
