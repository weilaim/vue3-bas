import axios from 'axios';
import { reqReject, reqResoleve, resReject, resResolve } from './interceptors';

export function createAxios(options = {}) {
  const defaultOptions = {
    timeout: 12000
  };
  const service = axios.create({
    ...defaultOptions,
    ...options
  });
  service.interceptors.request.use(reqResoleve, reqReject);
  service.interceptors.response.use(resResolve, resReject);
  return service;
}

export const request = createAxios({
  baseURL: import.meta.env.VITE_BASE_API
});
