import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { endpoints } from './endpoints'
import { getStorageItemAsync, setStorageItemAsync } from '@/hooks/use-storage-state'
import { router } from 'expo-router'

const appVersion = Constants.expoConfig?.version ?? '1.0'
const osInfo =
  Platform.OS === 'ios'
    ? `iPhone; iOS ${Platform.Version}`
    : `Android ${Platform.Version}; ${Platform.constants?.Model ?? 'Device'}`
const userAgent = `PeventApp/${appVersion} (${osInfo})`

export const api = axios.create({
  baseURL: endpoints.BASE_URL,
  headers: {
    'User-Agent': userAgent,
  },
})

let isRefreshing = false
let failedQueue: { resolve: (token: string) => void; reject: (error: any) => void }[] = []

function processQueue(error: any, token: string | null) {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

async function clearAuthAndRedirect() {
  await setStorageItemAsync('session', null)
  await setStorageItemAsync('refreshToken', null)
  router.replace('/(onboarding)/login')
}

api.interceptors.request.use(async (config) => {
  try {
    const token = await getStorageItemAsync('session')

    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
      config.headers.Accept = 'application/json'
    }
  } catch (e) {
    // ignore token retrieval errors
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error)
    }

    // Don't retry refresh requests themselves
    if (originalRequest.url === endpoints.AUTH.refresh) {
      await clearAuthAndRedirect()
      return Promise.reject(error)
    }

    // Guest users (no token) — just propagate the error
    const token = await getStorageItemAsync('session')
    if (!token) {
      return Promise.reject(error)
    }

    // Already retried this request — give up
    if (originalRequest._retry) {
      await clearAuthAndRedirect()
      return Promise.reject(error)
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(api(originalRequest))
          },
          reject,
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshToken = await getStorageItemAsync('refreshToken')

      if (!refreshToken) {
        processQueue(error, null)
        await clearAuthAndRedirect()
        return Promise.reject(error)
      }

      const { data } = await axios.post(`${endpoints.BASE_URL}${endpoints.AUTH.refresh}`, { refreshToken })

      const newAccessToken = data.data.accessToken
      const newRefreshToken = data.data.refreshToken

      await setStorageItemAsync('session', newAccessToken)
      await setStorageItemAsync('refreshToken', newRefreshToken)

      processQueue(null, newAccessToken)

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      await clearAuthAndRedirect()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
