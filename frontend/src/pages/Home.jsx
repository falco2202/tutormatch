import { DatePicker, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { requestIncrease, decrease } from '@/redux/reducers/appReducers'

function App() {
  const { t } = useTranslation()
  const { count, loading } = useSelector((state) => state.appSlice)

  /**
   *
   * Xy ly header theo role
   *
   */

  const dispatch = useDispatch()
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">{t('hello')}</h1>
      <Spin spinning={loading}>
        <h3>{count}</h3>
      </Spin>
      <button onClick={() => dispatch(requestIncrease())}>Increase</button>
      <button onClick={() => dispatch(decrease())}>Decrease</button>
      <DatePicker />
    </div>
  )
}

export default App
