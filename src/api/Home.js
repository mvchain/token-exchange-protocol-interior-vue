import request from '@/utils/request'

export function projectList(data) {
  return request({
    url: '/project?' + data,
    method: 'get'
  })
}
export function ossObjHandler(data) {
  return request({
    url: '/project/signature?dir=tokenExchange',
    method: 'get'
  })
}
export function addProject(data) {
  return request({
    url: '/project',
    method: 'post',
    async: false,
    data
  })
}
export function putProject(data) {
  return request({
    url: '/project',
    method: 'put',
    data
  })
}
export function proInfo(data) {
  return request({
    url: '/project/' + data,
    method: 'get'
  })
}
export function orderHandler(data) {
  return request({
    url: '/order?' + data,
    method: 'get'
  })
}
export function salesHandler(data) {
  return request({
    url: `/project/${data}/sold`,
    method: 'get'
  })
}
export function deletePro(data) {
  return request({
    url: '/project/' + data,
    method: 'delete'
  })
}
export function putShow(data) {
  return request({
    url: `/project/${data.id}/show/${data.show}`,
    method: 'put'
  })
}
