import apiClient from '@/api/apiClient'
import { CITY } from '@/api/constants'

const getWardApi = () => apiClient.get(CITY.GET_WARD)

const getCityApi = () => apiClient.get(CITY.GET_CITY)

export { getWardApi, getCityApi }
