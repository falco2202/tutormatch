import axios from 'axios'
import { USER_TOKEN } from '@/constants/tokenValue'
import { getLocalStorage } from '@/utils/storage'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: false
})

const urlFormData = ['/upload']

// config header
const defaultHeaders = {
  ...instance.defaults.headers.common,
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=UTF-8'
}
instance.defaults.headers.common = defaultHeaders

const onRequest = (config) => {
  const token = getLocalStorage(USER_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token} `
    if (urlFormData.includes(config.url)) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'multipart/form-data'
      }
    }
    return config
  }
  return config
}

const onResponse = (response) => ({
  ...response,
  data: response.data.data
})

const onRequestError = (error) => Promise.reject(error)

const onResponseError = (error) => Promise.reject(error)

instance.interceptors.request.use(onRequest, onRequestError)
instance.interceptors.response.use(onResponse, onResponseError)

export default instance
