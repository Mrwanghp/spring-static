import request from '../utils/request';

export function login(body) {
  return request('/users/login',{
      method: 'POST',
      body:JSON.stringify(body)
  });
}
