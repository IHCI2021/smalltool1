import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

// export default function callApi(endpoint, method = 'get', body) {
//   return fetch(`${API_URL}/${endpoint}`, {
//     headers: { 'content-type': 'application/json' },
//     method,
//     body: JSON.stringify(body),
//   })
//   .then(response => response.json().then(json => ({ json, response })))
//   .then(({ json, response }) => {
//     if (!response.ok) {
//       return Promise.reject(json);
//     }
//     return json;
//   })
//   .then(
//     response => response,
//     error => error
//   );
// }

// 修改为异步的race模式
const _TIMEOUT = 1000;
export default function callApi(endpoint, method = 'get', body) {
  return Promise.race([
    fetch(`${API_URL}/${endpoint}`, {
      headers: { 'content-type': 'application/json' },
      method,
      body: JSON.stringify(body),
    }),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(
        new Error('Time Out')
      ), _TIMEOUT);
    }),
  ]).then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  ).catch((response,error)=> {
    console.log('请求失败');
    console.log(response),
    console.error(error)
  });
}

// 向Django服务器请求

// 暂定8100端口，等完善后修改配置
export const API_URL_PY = "http://localhost:8100" ;

export function callApi_py(endpoint, method = 'get', body, headers = { 'content-type': 'application/json' }) {
  console.log('endpoint:',endpoint);
  return Promise.race([
    fetch(`${API_URL_PY}/${endpoint}`, {
      headers: headers,
      credentials: 'include',
      withCredentials: true,
      mode: 'cors',
      method,
      body: JSON.stringify(body),
    }),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(
        new Error('Time Out')
      ), _TIMEOUT);
    }),
  ]).then(response => {
    console.log(response);
    console.log(response.json());
    return response;
    // 06.30  读取状态码有问题，暂时禁用异步转换Json
    //return response.json().then(json => ({ json, response }))
  })
  // .then(({ json, response }) => {
  //   if (!response.ok) {
  //     return Promise.reject(json);
  //   }
  //   console.log(json)
  //   return json;
  // })
  // .then(
  //   response => response,
  //   error => error
  // ).catch((response,error)=> {
  //   console.log('请求失败');
  //   console.log(response),
  //   console.error(error)
  // });
}
