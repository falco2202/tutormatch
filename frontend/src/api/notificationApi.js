import apiClient from '@/api/apiClient'
import { NOTIFICATION } from '@/api/constants'

const getNotificationListApi = (params) =>
  apiClient.get(NOTIFICATION.GET_NOTIFICATION, { params })

const getDetailNotificationApi = (userId) =>
  apiClient.get(`${NOTIFICATION.GET_NOTIFICATION}/${userId}`)

const sendNotification = (params) =>
  apiClient.post(NOTIFICATION.GET_NOTIFICATION, params)

export { getNotificationListApi, getDetailNotificationApi, sendNotification }
