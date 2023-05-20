import { Trans, useTranslation } from 'react-i18next'
import Title from '@/components/atoms/Title'
import { Input, Table, Spin, Button, Popconfirm, Tag } from 'antd'
import {
  requestGetTeacher,
  requestSetConfirmTeacher,
  requestSetLockAndUnlockTeacher
} from '@/redux/reducers/userReducers'
import { useDataList } from '@/hooks/useDataList'
import { STATUS } from '@/constants/defaultValue'
import { ALL } from '@/constants/defaultValue'
import NotFoundSearch from '@/components/molecules/NotFoundSearch'
import { checkPagination, convertDataSource } from '@/utils/helper'
import { useDispatch } from 'react-redux'
import OptionSelect from '@/components/atoms/OptionSelect'
import useCommonColumnUser from '@/hooks/useCommonColumnUser'
import CustomHelmet from '@/components/atoms/CustomHelmet'
import { APPROVAL_ICON } from '@/assets/icons'
import { LockOutlined, UnlockOutlined } from '@ant-design/icons'

export default function TeacherList() {
  const { t } = useTranslation()

  const { Search } = Input

  const dispatch = useDispatch()

  const {
    isLoading,
    data,
    handleSearch,
    handleChange,
    params,
    setParams,
    pageSize,
    total,
    totalPage,
    searchParams
  } = useDataList(requestGetTeacher)

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
    },
    {
      title: t('common.form.status'),
      dataIndex: 'status',
      render: (_, record) =>
        record.profileTeacher &&
        (record?.profileTeacher[0]?.status === STATUS.TEACHER.PENDING ? (
          <Tag color="processing">{t('common.option.pending')}</Tag>
        ) : record?.profileTeacher[0]?.status === STATUS.TEACHER.APPROVED ? (
          <Tag color="success">{t('common.option.approved')}</Tag>
        ) : (
          <Tag color="red">{t('common.option.locked')}</Tag>
        ))
    },
    {
      title: t('common.form.action'),
      dataIndex: 'id',
      render: (_, record) =>
        record.profileTeacher &&
        (record?.profileTeacher[0]?.status === STATUS.TEACHER.PENDING ? (
          <Popconfirm
            title={t('teachers.list.action.title_approval')}
            description={
              <Trans i18nkey="teachers.list.action.content_approval">
                {t('teachers.list.action.content_approval', {
                  name: record.fullName
                })}
              </Trans>
            }
            onConfirm={() => handleConfirm(record.id)}
            onOk={t('common.button.ok')}
            cancelText={t('common.button.cancel')}
          >
            <Button
              className="bg-green-500 w-full text-white flex items-center"
              type="primary"
            >
              <img src={APPROVAL_ICON} alt="" width={20} className="mr-1" />
              {t('common.button.approval')}
            </Button>
          </Popconfirm>
        ) : record?.profileTeacher[0]?.status === STATUS.TEACHER.APPROVED ? (
          <Popconfirm
            title={t('teachers.list.action.title_lock')}
            description={
              <Trans i18nkey="teachers.list.action.content_lock">
                {t('teachers.list.action.content_lock', {
                  name: record.fullName
                })}
              </Trans>
            }
            onConfirm={() => handleLockAndUnLock(record.id)}
            onOk={t('common.button.ok')}
            cancelText={t('common.button.cancel')}
          >
            <Button className="w-full" type="primary" danger>
              <LockOutlined /> {t('common.button.lock')}
            </Button>
          </Popconfirm>
        ) : (
          <Popconfirm
            title={t('teachers.list.action.title_unlock')}
            description={
              <Trans i18nkey="teachers.list.action.content_unlock">
                {t('teachers.list.action.content_unlock', {
                  name: record.fullName
                })}
              </Trans>
            }
            onConfirm={() => handleLockAndUnLock(record.id)}
            onOk={t('common.button.ok')}
            cancelText={t('common.button.cancel')}
          >
            <Button className="bg-blue-500 w-full" type="primary">
              <UnlockOutlined /> {t('common.button.unlock')}
            </Button>
          </Popconfirm>
        ))
    }
  ])

  const handleConfirm = (id) => {
    dispatch(requestSetConfirmTeacher(id))
    dispatch(requestGetTeacher())
  }

  const handleLockAndUnLock = (id) => {
    dispatch(requestSetLockAndUnlockTeacher(id))
    dispatch(requestGetTeacher())
  }

  const dataSource = convertDataSource(data)
  const options = [
    {
      label: t('common.option.all'),
      value: ALL
    },
    {
      label: t('common.option.pending'),
      value: STATUS.TEACHER.PENDING
    },
    {
      label: t('common.option.approved'),
      value: STATUS.TEACHER.APPROVED
    },
    {
      label: t('common.option.locked'),
      value: STATUS.TEACHER.LOCKED
    }
  ]

  const handleFilter = (value) => {
    const newParams = {
      ...params,
      status: value,
      search_value: searchParams.get('search_value')
    }
    setParams(newParams)
  }

  const handlePagination = (pagination) => {
    const newParams = {
      ...params,
      page: pagination.current
    }
    setParams(newParams)
  }

  return (
    <>
      <CustomHelmet titleHelmet={t('common.sidebar.teacher_management')} />
      <Title title={t('common.sidebar.teacher_management')} />
      <Spin spinning={isLoading}>
        <div className="form__handle">
          <Search
            className="w-3/4"
            placeholder={t('common.placeholder.input_search_text')}
            onSearch={handleSearch}
            onChange={handleChange}
            enterButton
          />
          <OptionSelect
            value={params.status}
            label={t('common.form.status')}
            handleChange={handleFilter}
            options={options}
          />
        </div>
        {dataSource?.length > 0 ? (
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
