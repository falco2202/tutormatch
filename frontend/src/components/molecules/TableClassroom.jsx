import { useTranslation, Trans } from 'react-i18next'
import { ALL, OPTION, STATUS } from '@/constants/defaultValue'
import {
  Input,
  Table,
  Spin,
  Image,
  Button,
  Dropdown,
  Typography,
  Modal
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { DATE_FORMAT, ROLES } from '@/constants/common'
import { useState, useEffect, useMemo } from 'react'
import {
  requestGetListClass,
  requestDeleteClassroom
} from '@/redux/reducers/classReducers'
import { CLASS_COVER_IMAGE_DEFAULT } from '@/assets/images'
import dayjs from 'dayjs'
import { ACTIVE_ICON, LOCKED_ICON } from '@/assets/icons'
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  StarFilled
} from '@ant-design/icons'
import {
  isTimeInProgress,
  formatMoney,
  checkPagination,
  roundNumber
} from '@/utils/helper'
import NotFoundSearch from '@/components/molecules/NotFoundSearch'
import { useNavigate } from 'react-router-dom'
import OptionSelect from '@/components/atoms/OptionSelect'
import { useSearchParams } from 'react-router-dom'

export default function TableClassroom() {
  const { t } = useTranslation()

  const { Search } = Input
  const { confirm } = Modal

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { role } = useSelector((state) => state.authSlice)
  const { isLoading, classData, pageSize, total, totalPage } = useSelector(
    (state) => state.classSlice
  )
  const [searchParams, setSearchParams] = useSearchParams()

  const [params, setParams] = useState({
    search_value: '',
    order_by_avg_star: OPTION.DESC,
    teacher_status: ALL
  })

  const getClassList = (params) => {
    const newParams = { ...params }
    if (params.teacher_status === ALL) {
      newParams.teacher_status = ''
    }
    dispatch(requestGetListClass(newParams))
  }

  useEffect(() => {
    setSearchParams(params)
    getClassList(params)
  }, [params])

  const dropItems = [
    {
      key: 'update',
      label: (
        <Button
          className="w-[6.2rem] flex justify-center items-center"
          type="primary"
        >
          <EditOutlined /> <span>{t('common.button.update')}</span>
        </Button>
      ),
      roleAccess: [ROLES.TEACHER]
    },
    {
      key: 'delete',
      label: (
        <Button className="w-[6.2rem]" danger type="primary">
          <DeleteOutlined /> {t('common.button.delete')}
        </Button>
      ),
      roleAccess: [ROLES.ADMIN, ROLES.TEACHER]
    }
  ]

  const items = useMemo(() => {
    const listItem = dropItems.filter((item) => item.roleAccess.includes(role))
    return listItem.map((item) => {
      delete item.roleAccess
      return item
    })
  }, [role])

  const optionsSort = [
    {
      label: t('common.option.asc'),
      value: OPTION.ASC
    },
    {
      label: t('common.option.desc'),
      value: OPTION.DESC
    }
  ]

  const optionsStatus = [
    {
      label: t('common.option.active'),
      value: STATUS.TEACHER.APPROVED
    },
    {
      label: t('common.option.locked'),
      value: STATUS.TEACHER.LOCKED
    },
    {
      label: t('common.option.all'),
      value: ALL
    }
  ]

  const columns = [
    {
      title: t('common.form.class_name'),
      dataIndex: 'className',
      width: '10%',
      render: (_, record) => (
        <Typography.Link onClick={() => navigate(`${record.id}`)}>
          {record.className}
        </Typography.Link>
      )
    },
    {
      title: t('common.form.image'),
      dataIndex: 'image',
      width: '12%',
      render: (_, record) => (
        <Image
          src={record.image?.url || CLASS_COVER_IMAGE_DEFAULT}
          preview={false}
          width="100%"
          className="aspect-video"
          alt={record.className}
        />
      )
    },
    {
      title: t('common.form.subject'),
      dataIndex: 'subject',
      width: '7%'
    },
    {
      title: t('common.form.tuition_fee'),
      dataIndex: 'tuitionFee',
      width: '7%',
      render: (item) => formatMoney(item)
    },
    {
      title: t('common.form.time'),
      dataIndex: 'time',
      width: '10%',
      render: (_, record) => (
        <>
          <p>{`${t('classroom.add_classroom.lesson_start')}: ${dayjs(
            record.dateStart
          ).format(DATE_FORMAT.DATE_MONTH_YEAR)}`}</p>
          <p>
            {`${t('classroom.add_classroom.lesson_end')}: ${dayjs(
              record.dateEnd
            ).format(DATE_FORMAT.DATE_MONTH_YEAR)}`}
          </p>
        </>
      )
    },
    {
      title: t('common.form.quantity'),
      dataIndex: 'quantity',
      width: '6%',
      render: (_, record) => (
        <>
          <p>{`${record.countStudentsInClass}/${record.quantity}`}</p>
        </>
      )
    },
    {
      title: t('common.form.avg_star'),
      dataIndex: 'avgStar',
      render: (item) =>
        item ? (
          <>
            {roundNumber(item)}
            <StarFilled className="text-[#fadb14] ml-1" />
          </>
        ) : (
          t('common.form.not_rate')
        ),
      width: '8%'
    },
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
      title: t('common.form.action'),
      dataIndex: t('id'),
      render: (_, record) => (
        <div>
          <Dropdown.Button
            type="primary"
            menu={{ items, onClick: (e) => handleClickMenu(e, record) }}
            icon={<DownOutlined />}
          >
            {t('common.form.action')}
          </Dropdown.Button>
        </div>
      ),
      width: '8%'
    }
  ]

  if (role === ROLES.ADMIN) {
    columns.splice(columns.length - 1, 0, {
      title: t('common.form.status'),
      dataIndex: 'id',
      render: (_, record) =>
        record.profileTeacher && (
          <Image
            src={
              record?.profileTeacher?.status === STATUS.TEACHER.APPROVED
                ? ACTIVE_ICON
                : LOCKED_ICON
            }
            preview={false}
            width={30}
          />
        ),
      align: 'center',
      width: '7%'
    })
  }

  const handleDelete = (id) => {
    dispatch(requestDeleteClassroom(id))
    getClassList(params)
  }

  const handleClickMenu = (e, record) => {
    if (e.key === 'delete') {
      return confirm({
        title: t('classroom.form.title_delete'),
        content: isTimeInProgress(record.dateStart, record.dateEnd) ? (
          <Trans i18nkey="classroom.form.content_delete_in_progress">
            {t('classroom.form.content_delete_in_progress', {
              name: record.className
            })}
          </Trans>
        ) : (
          <Trans i18nkey="classroom.form.content_delete">
            {t('classroom.form.content_delete', {
              name: record.className
            })}
          </Trans>
        ),
        onOk() {
          handleDelete(record.id)
        },
        okText: t('common.button.ok'),
        cancelText: t('common.button.cancel')
      })
    }
    navigate(`update/${record.id}`)
  }

  const handleSearch = () => {
    const newParams = {
      ...params,
      search_value: searchParams.get('search_value'),
      page: 1
    }
    setParams(newParams)
  }

  const handleChange = (e) => {
    const newInput = e.target.value
    setSearchParams({ search_value: newInput })
  }

  const handleFilterStatus = (value) => {
    const newParams = {
      ...params,
      teacher_status: value,
      search_value: searchParams.get('search_value')
    }
    setParams(newParams)
  }

  const handleSortStar = (value) => {
    const newParams = {
      ...params,
      order_by_avg_star: value,
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
    <Spin spinning={isLoading}>
      <div className="form__handle">
        <Search
          className="w-3/5"
          placeholder={t('common.placeholder.input_class_name_text')}
          enterButton
          onSearch={handleSearch}
          onChange={handleChange}
        />
        <OptionSelect
          value={params.order_by_avg_star}
          label={t('common.form.sort_by_star')}
          handleChange={handleSortStar}
          options={optionsSort}
        />
        {role === ROLES.ADMIN && (
          <OptionSelect
            value={params.teacher_status}
            label={t('common.form.status')}
            handleChange={handleFilterStatus}
            options={optionsStatus}
          />
        )}
      </div>
      {classData?.length > 0 ? (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={classData}
          pagination={checkPagination(total, totalPage, pageSize)}
          onChange={handlePagination}
        />
      ) : (
        <NotFoundSearch message={t('error_messages.not_found')} />
      )}
    </Spin>
  )
}
