import request from '@/utils/request'

export const getarticlelist = (channelid, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelid,
      timestamp
    }
  })
}
export const getnewsdetail = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
export const newThumbsup = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
export const CancelnewThumbsup = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
