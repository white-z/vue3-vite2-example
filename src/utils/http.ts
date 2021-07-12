import axios from 'axios';

export type Method = 'get' | 'post' | 'put' | 'delete'

const service = axios.create({
  baseURL: 'https://whitejs.com',
  timeout: 10000, // 超时时间
  headers: {
    // 'Content-type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});
service.interceptors.request.use(
  (config) => {
    // token认证写在这里
    return config;
  },
  (err: Error) => {
    Promise.reject(err);
  }
);
// 响应拦截
service.interceptors.response.use(
  (config) => {
    return config;
  },
  (err: Error) => {
    Promise.reject(err);
  }
);

export default (method: Method, api: string, params: any = {}, config: any = {}) => {

  const obj: any = {};
  if (method === 'get' || method === 'delete') {
    obj.params = params;
  } else if (params instanceof FormData) {
    obj.data = params;
  } else {
    const data = new FormData();
    for (const key in params) {
      const value = params[key];
      if (['', undefined, null].includes(value)) {
        continue;
      }
      data.append(key, params[key]);
    }
    obj.data = data;
  }
  service.defaults.headers = { ...config.headers, ...service.defaults.headers }
  if (config.timeout) {
    service.defaults.timeout = config.timeout;
  }
  return new Promise((resolve, reject) => {
    service({
      ...obj,
      method,
      url: api
    }).then((res) => {
      const { code, data } = res.data;
      switch (code) {
        case 1:
          resolve(data);
          break;
        case -1:
          window.location.href = window.location.origin // 直接跳转到登录页面
          reject(res.data);
          break;
        default:
          reject(res.data);
          break;
      }
    }).catch((err) => {
      reject(err);
    });
  });
};
