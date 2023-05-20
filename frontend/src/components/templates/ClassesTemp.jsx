import ClassesTableOrg from '@/components/organisms/ClassesTableOrg'
import SearchByName from '@/components/atoms/SearchByName'
import NotFoundSearch from '@/components/molecules/NotFoundSearch'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { requestGetListClass } from '@/redux/reducers/classReducers'
import { Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getParamNumber, getParamOrder } from '@/utils/helper'
import { useTranslation } from 'react-i18next'
import CustomHelmet from '@/components/atoms/CustomHelmet'

const ClassesTemp = () => {
  const { t } = useTranslation()
  const { isLoading, classData, total } = useSelector(
    (state) => state.classSlice
  )
  const dispatch = useDispatch()
  const [paramsUrl, setParamsUrl] = useSearchParams()
  const params = useMemo(() => {
    const page = getParamNumber(paramsUrl.get('page'), 1)
    const search_value = paramsUrl.get('search_value') || ''
    const order_by_class = getParamOrder(paramsUrl.get('order_by_class'))
    return { page, search_value, order_by_class }
  }, [paramsUrl])

  useEffect(() => {
    setParamsUrl(params)
    dispatch(requestGetListClass(params))
  }, [params])

  const handleSetParams = (listParamsChange) => {
    const newParams = params
    listParamsChange.forEach((item) => {
      newParams[item.key] = item.value
    })

    setParamsUrl(newParams)
  }

  const handleSearch = (value) => {
    const paramsChange = [
      { key: 'search_value', value },
      { key: 'page', value: 1 },
      { key: 'order_by_class', value: '' }
    ]

    handleSetParams(paramsChange)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <CustomHelmet titleHelmet={t('common.form.class')} />
      <div className="w-4/5 space-y-10">
        <div className="w-full">
          <SearchByName
            handleSearch={handleSearch}
            defaultValue={params.search_value}
          />
        </div>
        <Spin spinning={isLoading}>
          {classData.length === 0 ? (
            <div className="w-full">
              <NotFoundSearch message={t('error_messages.not_found')} />
            </div>
          ) : (
            <div className="w-full">
              <ClassesTableOrg
                listClasses={classData}
                total={total}
                onSetParams={handleSetParams}
                params={params}
              />
            </div>
          )}
        </Spin>
      </div>
    </div>
  )
}

export default ClassesTemp
