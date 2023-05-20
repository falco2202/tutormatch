import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
  isLoading: false,
  searchGlobal: null,
  wardData: {
    wards: []
  },
  listCities: []
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    requestIncrease: () => {},
    toggleLoading: (state, { payload }) => {
      state.loading = payload
    },
    increase: (state) => {
      state.count++
    },
    decrease: (state) => {
      state.count--
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    requestGetWard: () => {},
    setListWard: (state, { payload }) => {
      state.wardData = payload
    },
    requestGetCity: () => {},
    setListCity: (state, { payload }) => {
      state.listCities = payload
    },
    setSearchGlobal: (state, { payload }) => {
      state.searchGlobal = payload
    }
  }
})

export const {
  requestIncrease,
  increase,
  decrease,
  setListWard,
  toggleLoading,
  requestGetWard,
  requestGetCity,
  setListCity,
  setSearchGlobal
} = appSlice.actions
export default appSlice.reducer
