import request from '@/utils/request'
export const getmychannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
