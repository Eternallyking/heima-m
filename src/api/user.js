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
export const concernusers = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'post',
    data: {
      target
    }
  })
}
export const Cancelconcernusers = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
export const editinformation = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
export const editmyinformation = (name, gender, birthday, realname, intro) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday,
      real_name: realname,
      intro
    }
  })
}
export const uploadPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}

export const userkoken = () => {
  return request({
    url: '/v1_0/authorizations',
    method: 'PUT'
  })
}
