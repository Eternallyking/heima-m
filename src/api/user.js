import request from '@/utils/request'

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
export const sendcode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getuserinfo = () => {
  return request({
    url: '/v1_0/user'
  })
}
