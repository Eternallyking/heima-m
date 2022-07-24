import request from '@/utils/request'
export const getcomments = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
export const newscomments = (target, content, id) => {
  return request({
    url: '/v1_0/comments',
    method: 'post',
    data: {
      target,
      content,
      art_id: id
    }
  })
}
