/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios'

import instance from './axios'

const api = {
  get: async <ReturnType, QueryParamType = any>(
    url: string,
    params?: QueryParamType,
    config: AxiosRequestConfig = {},
  ): Promise<ReturnType> =>
    instance
      .get<ReturnType>(`${url}`, { params, ...config })
      .then((res) => res.data),

  post: async <BodyType, ReturnType = {}>(
    url: string,
    body: BodyType,
    fileFlag = false,
    config: AxiosRequestConfig = {},
  ): Promise<ReturnType> =>
    instance
      .post(`${url}`, body, { fileFlag, ...config })
      .then((res) => res.data),

  patch: async <BodyType, ReturnType = {}>(
    url: string,
    body: BodyType,
    fileFlag = false,
    config: AxiosRequestConfig = {},
  ): Promise<ReturnType> =>
    instance
      .patch(`${url}`, body, { fileFlag, ...config })
      .then((res) => res.data),

  put: async <BodyType, ReturnType = {}>(
    url: string,
    body: BodyType,
    fileFlag = false,
    config: AxiosRequestConfig = {},
  ): Promise<ReturnType> =>
    instance
      .put(`${url}`, body, { fileFlag, ...config })
      .then((res) => res.data),

  delete: async <BodyType, ReturnType = {}>(
    url: string,
    body?: BodyType,
  ): Promise<ReturnType> =>
    instance.delete(`${url}`, { data: body }).then((res) => res.data),
}

export default api
