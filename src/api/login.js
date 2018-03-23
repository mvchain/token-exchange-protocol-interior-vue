import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin',
    method: 'post',
    data
  })
}
export function refreshToken(data) {
  return request({
    url: '/admin/token/refresh',
    method: 'post'
  })
}
