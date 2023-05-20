import { createSlice } from '@reduxjs/toolkit'
import { INIT_PAGE_PARAM } from '@/constants/defaultValue'
import { addUniqueKey } from '@/utils/helper'
const initialState = {
  isLoading: false,
  data: {},
  pageSize: INIT_PAGE_PARAM.PAGE_SIZE,
  total: INIT_PAGE_PARAM.TOTAL,
  totalPage: INIT_PAGE_PARAM.TOTAL_PAGE,
  currentPage: INIT_PAGE_PARAM.CURRENT_PAGE
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    requestGetClassroom: () => {},
    requestGetParent: () => {},
    requestGetParentDetail: () => {},
    requestGetTeacher: () => {},
    requestGetTeacherDetail: () => {},
    requestGetStudentDetail: () => {},
    requestSetConfirmTeacher: () => {},
    requestSetLockAndUnlockTeacher: () => {},
    requestGetStudent: () => {},
    setListData: (state, { payload }) => {
      const { items, total, pageSize, currentPage, totalPage } = payload
      return {
        ...state,
        data: addUniqueKey(items),
        total,
        pageSize,
        currentPage,
        totalPage
      }
    },

    setDetailData: (state, { payload }) => {
      const { data } = payload
      // TODO, fake data.profileStudent
      // waiting for api get detail student
      if (data.role === 2) {
        data.profileStudent = [
          {
            classrooms: [
              { id: 1, className: 'Lớp 1' },
              { id: 2, className: 'Lớp 2' }
            ]
          }
        ]
      }
      return {
        ...state,
        data
      }
    },

    setStatusUser: (state, { payload }) => {
      const { status } = payload
      state.status = status
    },

    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    }
  }
})

export const {
  requestGetParent,
  setListData,
  requestGetParentDetail,
  setDetailData,
  requestGetTeacher,
  requestGetStudentDetail,
  requestGetTeacherDetail,
  requestSetConfirmTeacher,
  requestSetLockAndUnlockTeacher,
  setStatusUser,
  toggleLoading,
  requestGetClassroom,
  setListClassroom,
  requestGetStudent
} = userSlice.actions

export default userSlice.reducer
