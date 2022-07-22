import request from '@/utils/request'
export const Writereview = (target, content, id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: id
    }
  })
}
