import { createSlice } from '@reduxjs/toolkit'
import { addUniqueKey, updateDataDetail } from '@/utils/helper'
import { INIT_PAGE_PARAM } from '@/constants/defaultValue'
import dayjs from 'dayjs'
import { DATE_FORMAT, TIME_FORMAT } from '@/constants/common'

const initialState = {
  isLoading: false,
  classData: [],
  pageSize: INIT_PAGE_PARAM.PAGE_SIZE,
  total: INIT_PAGE_PARAM.TOTAL,
  totalPage: INIT_PAGE_PARAM.TOTAL_PAGE,
  currentPage: INIT_PAGE_PARAM.CURRENT_PAGE,
  profileTeacher: null,
  classInformation: null
}

const classSlice = createSlice({
  name: 'classSlice',
  initialState,
  reducers: {
    requestGetListClass: () => {},
    requestAddClass: () => {},
    requestDeleteClassroom: () => {},
    requestGetDetailClass: () => {},
    requestApprovalAndCancel: () => {},
    requestAttendanceClassroom: () => {},
    requestGetDetailClass: () => {},
    requestGetDetailClassGlobal: () => {},
    requestFeedbackClassroom: () => {},
    setClassList: (state, { payload }) => {
      const { items, total, pageSize, currentPage, totalPage } = payload
      return {
        ...state,
        classData: addUniqueKey(items),
        total,
        pageSize,
        currentPage,
        totalPage
      }
    },

    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setDetailClass: (state, { payload }) => {
      state.classInformation = payload
    },

    updateFeedbackList: (state, { payload }) => {
      const { user, data } = payload
      const { feedback } = state.classInformation
      const feedbackData = {
        ...data.content,
        date_comment: dayjs().format(
          `${DATE_FORMAT.YEAR_MONTH_DAY} ${TIME_FORMAT.HOUR_MINUTES_SECOND}`
        )
      }
      const newFeedback = { ...feedbackData, user }
      feedback.unshift(newFeedback)
      updateDataDetail(state.classInformation)
    },

    addFeedback: (state, { payload }) => {
      state.classInformation.feedback = payload.feedback
    }
  }
})

export const {
  requestGetListClass,
  requestAddClass,
  setClassList,
  toggleLoading,
  requestDeleteClassroom,
  requestApprovalAndCancel,
  requestAttendanceClassroom,
  requestGetDetailClassGlobal,
  requestGetDetailClass,
  setDetailClass,
  requestFeedbackClassroom,
  updateFeedbackList,
  addFeedback
} = classSlice.actions

export default classSlice.reducer
