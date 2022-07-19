import request from '@/utils/request'
import storage from '@/utils/storage'
export const getmychannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllchannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
export const DelMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
export const AddMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getmychannelsbylocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setmychannelstolocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
