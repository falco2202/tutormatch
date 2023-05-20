import { useState } from 'react'
import { ALL, INIT_PAGE_PARAM } from '@/constants/defaultValue'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { requestGetClassroom } from '@/redux/reducers/userReducers'
import { useSearchParams } from 'react-router-dom'

const useDataList = (requestType) => {
  const { isLoading, data, currentPage, pageSize, total, totalPage } =
    useSelector((state) => state.userSlice)
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const [params, setParams] = useState({
    page: INIT_PAGE_PARAM.CURRENT_PAGE,
    search_value: '',
    status: ALL
  })

  const getData = (params) => {
    switch (requestType().type) {
      case requestGetClassroom().type:
        params.page_size = INIT_PAGE_PARAM.PAGE_SIZE_CLASSROOM
        params.order_by_avg_star = INIT_PAGE_PARAM.ORDER_BY_AVG_STAR
        break
    }
    const newParams = { ...params }
    if (params.status === ALL) {
      newParams.status = ''
    }
    dispatch(requestType(newParams))
  }

  useEffect(() => {
    setSearchParams(params)
    getData(params)
  }, [params])

  const handleChange = (e) => {
    const newInput = e.target.value
    setSearchParams({ search_value: newInput })
  }

  const handleSearch = () => {
    const newParams = {
      ...params,
      search_value: searchParams.get('search_value'),
      page: 1
    }
    setParams(newParams)
  }

  return {
    isLoading,
    data,
    handleSearch,
    handleChange,
    params,
    setParams,
    currentPage,
    pageSize,
    total,
    totalPage,
    searchParams
  }
}

export { useDataList }
