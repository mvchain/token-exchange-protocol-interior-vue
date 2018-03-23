import request from '@/utils/request'

export function txListHandler(data) {
  return request({
    url: '/transaction?' + data,
    method: 'get'
  })
}
export function opera(data) {
  return request({
    url: `/transaction/${data.id}/status/${data.status}`,
    method: 'put'
  })
}
