/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This file configures and exports an Axios instance for making HTTP requests.
 * It includes custom interceptors for request and response handling, as well as token refresh logic.
 */
import axios, { AxiosInstance } from 'axios'

import { env } from '@/configs/env'
import {
  ALL_ROUTES,
  API_ROUTES,
  ERROR_CODE,
  HTTP_STATUS_CODE,
} from '@/constants'
import { defaultQueryClient } from '@/contexts/QueryProvider'
import { useUserStore } from '@/stores/user'

// Base URL for API requests
const URL_GATEWAY = `${env.API_URL}`

// Extend AxiosRequestConfig interface to include custom properties
declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: boolean
    fileFlag?: boolean
    noTokenFlag?: boolean
  }
}

// Create Axios instance with default configuration
const instance: AxiosInstance = axios.create({
  baseURL: URL_GATEWAY,
  timeout: 60000,
})

// Set default headers
instance.defaults.headers.common.Accept = 'application/json'
instance.defaults.headers.common['Content-Type'] =
  'application/json; charset=UTF-8'

// Variables for token refresh mechanism
const isRefreshing = false
let failedQueue: any[] = []

/**
 * Process the queue of failed requests after token refresh
 * @param error - Error object if token refresh failed
 * @param token - New access token if refresh was successful
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Handle file upload requests
    if (config.fileFlag === true) {
      config.headers['Content-Type'] = 'multipart/form-data'
      delete config.fileFlag
    }

    // Add timezone to headers
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timeZone) {
      config.headers['X-Timezone'] = timeZone
    }

    // Add authorization token to headers
    const accessToken = useUserStore.getState().user?.accessToken
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 400 error and proteced actions
    if (
      error?.response?.status === 400 &&
      error?.response?.data?.error?.code === ERROR_CODE.INVALID_TOKEN
    ) {
      useUserStore.getState().reset()
      defaultQueryClient.clear()
      window.location.href = ALL_ROUTES.SIGN_IN
      // this for handle after sign in sucessfully, we redirect to previous
      // window.location.href = `${PAGE_ROUTES.SIGN_IN}?returnUrl=${
      //   window.location.pathname + window.location.search
      // }`;
    }
    // Handle 401 errors and token refresh

    if (
      error?.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      useUserStore.getState().reset()
      defaultQueryClient.clear()
      window.location.href = ALL_ROUTES.SIGN_IN
      // if (isRefreshing) {
      //   // If a refresh is already in progress, queue the request
      //   return new Promise((resolve, reject) => {
      //     failedQueue.push({ resolve, reject });
      //   })
      //     .then((token) => {
      //       originalRequest.headers['Authorization'] = `Bearer ${token}`;
      //       return instance(originalRequest);
      //     })
      //     .catch((err) => Promise.reject(err));
      // }

      // originalRequest._retry = true;
      // isRefreshing = true;

      // try {
      //   // Attempt to refresh the token
      //   const response = await axios.post(
      //     `${ENVIRONMENTS.API_URL}${API_ROUTES.AUTH.REFRESH}`,
      //     {
      //       refreshToken: useUserStore.getState().user?.accessToken,
      //     },
      //   );
      //   const { accessToken } = response.data.data;

      //   // Update tokens in store and headers
      //   useUserStore.getState().setAccessToken(accessToken);
      //   instance.defaults.headers.common['Authorization'] =
      //     `Bearer ${accessToken}`;

      //   // Process queued requests with new token
      //   processQueue(null, accessToken);
      //   return instance(originalRequest);
      // } catch (refreshError) {
      //   // Handle refresh failure
      //   processQueue(refreshError, null);
      //   useUserStore.getState().reset();
      //   window.location.href = ALL_ROUTES.SIGN_IN;
      //   return Promise.reject(refreshError);
      // } finally {
      //   isRefreshing = false;
      //   queryClient.clear();
      // }
    }

    return Promise.reject(error)
  },
)

export default instance
