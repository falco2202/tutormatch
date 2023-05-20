import { USER_TOKEN, USER_ID } from '@/constants/tokenValue'
import { USER_ROLE, DUMMY_USER } from '@/constants/defaultValue'
import { createSlice } from '@reduxjs/toolkit'
import { setLocalStorage } from '@/utils/storage'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/common'
import { data } from 'autoprefixer'

const initialState = {
  isLoading: false,
  token: null,
  role: null,
  avatar: null,
  profileData: DUMMY_USER,
  status: null,
  isUnauthenticated: false,
  verifyEmail: {
    data: null,
    status: false
  }
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    requestGetMe: () => {},
    requestLogin: () => {},
    requestLogout: () => {},
    requestRegister: () => {},
    requestAvatar: () => {},
    requestUpdateProfile: () => {},
    requestCreateAccountStudent: () => {},
    requestVerifyEmail: () => {},
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    removeAuthInfo: (state) => {
      state.token = null
      state.role = null
      state.profileData = DUMMY_USER
      localStorage.clear()
    },
    setCurrentUser: (state, { payload }) => {
      const { id, role, token, ...rest } = payload.data
      state.profileData = { ...rest, id }
      state.role = role
      state.token = token
      setLocalStorage(USER_TOKEN, token)
      setLocalStorage(USER_ROLE, role)
      setLocalStorage(USER_ID, id)
    },
    setAvatar: (state, { payload }) => {
      state.avatar = payload
    },
    setProfileUser: (state, { payload }) => {
      state.profileData = payload.data
      state.role = payload.data.role
      state.avatar = payload.data.image?.url || ''
    },
    setCreateAccount: (state, { payload }) => {
      const data = {
        ...payload,
        fullName: payload.full_name,
        dateOfBirth: dayjs(payload.date_of_birth).format(
          DATE_FORMAT.YEAR_MONTH_DAY
        )
      }
      state.profileData.childrens.unshift(data)
    },
    setIsUnauthenticated: (state, { payload }) => {
      state.isUnauthenticated = payload
    },
    setStatusVerifyEmail: (state, { payload }) => {
      state.verifyEmail.status = payload
    },
    setDataVerifyEmail: (state, { payload }) => {
      state.verifyEmail.data = payload
      state.verifyEmail.status = true
    }
  }
})

export const {
  requestLogin,
  toggleLoading,
  requestRegister,
  requestLogout,
  requestAvatar,
  requestGetMe,
  removeAuthInfo,
  setCurrentUser,
  setAvatar,
  setProfileUser,
  requestUpdateProfile,
  requestCreateAccountStudent,
  setCreateAccount,
  setIsUnauthenticated,
  setDataVerifyEmail,
  setStatusVerifyEmail,
  requestVerifyEmail
} = authSlice.actions
export default authSlice.reducer
