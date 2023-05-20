import { useTranslation } from 'react-i18next'
import { Input, Spin, Table } from 'antd'
import Title from '@/components/atoms/Title'
import { requestGetParent } from '@/redux/reducers/userReducers'
import { useDataList } from '@/hooks/useDataList'
import NotFoundSearch from '@/components/molecules/NotFoundSearch'
import { checkPagination, convertDataSource } from '@/utils/helper'
import useCommonColumnUser from '@/hooks/useCommonColumnUser'
import CustomHelmet from '@/components/atoms/CustomHelmet'

export default function ParentList() {
  const { t } = useTranslation()

  const { Search } = Input

  const {
    isLoading,
    data,
    handleSearch,
    handleChange,
    params,
    setParams,
    pageSize,
    total,
    totalPage
  } = useDataList(requestGetParent)

  const tableColumns = useCommonColumnUser().concat([
    {
      title: t('common.form.address'),
      dataIndex: 'address',
      width: '20%',
      render: (item) =>
        item
          ? `${item[0]?.address ?? ''}, ${item[0]?.ward?.name ?? ''}, ${
              item[0]?.ward?.city?.name ?? ''
            }`
          : t('error_messages.not_found')
    }
  ])
  const dataSource = convertDataSource(data)
  const handlePagination = (pagination) => {
    const newParams = {
      ...params,
      page: pagination.current
    }
    setParams(newParams)
  }

  return (
    <>
      <CustomHelmet
        titleHelmet={`TutorMatch | ${t('common.sidebar.parent_management')}`}
      />

      <Title title={t('common.sidebar.parent_management')} />
      <Spin spinning={isLoading}>
        <div className="form__handle">
          <Search
            placeholder={t('common.placeholder.input_search_text')}
            onSearch={handleSearch}
            onChange={handleChange}
            enterButton
          />
        </div>
        {dataSource?.length !== 0 ? (
          <>
            <Table
              rowKey="id"
              dataSource={dataSource}
              pagination={checkPagination(total, totalPage, pageSize)}
              columns={tableColumns}
              onChange={handlePagination}
            />
          </>
        ) : (
          <NotFoundSearch message={t('error_messages.not_found')} />
        )}
      </Spin>
    </>
  )
}
