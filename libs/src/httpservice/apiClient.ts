import axios from 'axios';

export const apiClient = {
  get: <T>(url: string, params?: object, headers?: object) =>
    axios.get<T>(url, {
      headers: { ...headers },
      ...params,
    }),
  post: <T>(url: string, data: unknown, headers?: object) =>
    axios.post<T>(url, data, {
      headers: { ...headers },
    }),
  patch: <T>(url: string, data: unknown, headers?: object) =>
    axios.patch<T>(url, data, {
      headers: { ...headers },
    }),
  delete: <T>(url: string, headers?: object) =>
    axios.delete<T>(url, {
      headers: { ...headers },
    }),
  put: <T>(url: string, data: unknown, headers?: object) =>
    axios.put<T>(url, data, {
      headers: { ...headers },
    }),
};
