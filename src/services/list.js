import request from '../utils/request';

export function videoList(body) {
  return request('/list/video',{
      method: 'POST',
      body:JSON.stringify(body)
  });
}
