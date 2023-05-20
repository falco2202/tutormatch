import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import reducers from '@/redux/reducers'
import rootSaga from '@/redux/sagas'
import { combineReducers } from '@reduxjs/toolkit'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers(reducers)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false
    }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
