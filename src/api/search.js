import request from '@/utils/request'

export const getsearchsuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export const getsearchresult = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
