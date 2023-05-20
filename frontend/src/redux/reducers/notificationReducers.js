import { createSlice } from '@reduxjs/toolkit'
import { INIT_PAGE_PARAM } from '@/constants/defaultValue'
import { decodeListNotification } from '@/utils/helper'
import dayjs from 'dayjs'
const initialState = {
  isLoading: false,
  items: [],
  pageSize: INIT_PAGE_PARAM.PAGE_SIZE,
  total: INIT_PAGE_PARAM.TOTAL,
  totalPage: INIT_PAGE_PARAM.TOTAL_PAGE,
  currentPage: INIT_PAGE_PARAM.CURRENT_PAGE,
  detailNotification: {}
}

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    requestGetNotifications: () => {},
    requestSendNotification: () => {},
    requestGetDetailNotification: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload)
      if (index >= 0) {
        state.items[index].readAt = dayjs()
      }
    },

    setNotificationList: (state, { payload }) => {
      const dataItems = decodeListNotification(payload.items)
      return {
        ...state,
        ...payload,
        items: [...state.items, ...dataItems]
      }
    },
    removeNotificationList: () => {
      return initialState
    },
    setDetailNotification: (state, { payload }) => {
      state.detailNotification = payload
    },
    addNewNotification: (state, { payload }) => {
      state.total = state.total + 1
      if (state.items.length > 0) {
        state.items.pop()
      }
      state.items.unshift(payload)
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    }
  }
})

export const {
  requestGetNotifications,
  setNotificationList,
  toggleLoading,
  removeNotificationList,
  setDetailNotification,
  requestGetDetailNotification,
  addNewNotification,
  requestSendNotification
} = notificationSlice.actions

export default notificationSlice.reducer
