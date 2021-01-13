import request from '../utils/request';
// list
export function videoList(body) {
  return request('/getList',{
      method: 'POST',
      body:JSON.stringify(body)
  });
}
// 筛选列表
export function tabList(body) {
  return request('/getClass',{
      method: 'POST',
      body:JSON.stringify(body)
  });
}
// 筛选列表
export function getValueSet(body) {
  return request('/getValueSet',{
      method: 'POST',
      body:JSON.stringify(body)
  });
}
// 列表详情
export function listDetail(body) {
  return request('/getDetail',{
      method: 'POST',
      body:JSON.stringify(body)
  });
}
