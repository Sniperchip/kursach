import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://chatty-kiwis-jump-62-217-188-116.loca.lt';

export function paramsHandler(options: any) {
  let params = {} as any;
  Object.entries(options).forEach(([paramKey, paramValue]: [string, any]) => {
    if (paramValue?.toString()) {
      params[paramKey] = paramValue.toString();
    }
  });
  return params;
}

export function post(url: string, data = {}) {
  return axios.post(`${BASE_URL}${url}`, data);
}

export function get(url: string, options?: any) {
  return axios.get(`${BASE_URL}${url}`, {
    params: options ? paramsHandler(options) : null,
  });
}

export function put(url: string, params?: any, config?: AxiosRequestConfig) {
  return axios.put(`${url}`, params, config);
}

export function patch(url: string, params?: any, config?: AxiosRequestConfig) {
  return axios.patch(`${BASE_URL}${url}`, params, config);
}

export function delete_(url: string, config?: AxiosRequestConfig) {
  return axios.delete(`${BASE_URL}${url}`, config);
}
