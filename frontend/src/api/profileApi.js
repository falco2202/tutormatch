import apiClient from '@/api/apiClient'
import { PROFILE } from '@/api/constants'

const getProfileApi = () => apiClient.get(PROFILE.GET_PROFILE)
const updateProfileApi = (data) => apiClient.post(PROFILE.GET_PROFILE, data)
export { getProfileApi, updateProfileApi }
