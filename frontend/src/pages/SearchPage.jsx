import Header from '@/layouts/admin/Header'
import Footer from '@/layouts/admin/Footer'
import { useTranslation } from 'react-i18next'

import { Col, Input, Select, List, Rate, Spin, Button, Typography } from 'antd'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  RightOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { requestGetWard } from '@/redux/reducers/appReducers'
import { useEffect, useMemo, useRef } from 'react'
import { requestGetClassroom } from '@/redux/reducers/userReducers'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  getParamOrder,
  getParamZeroOne,
  getParamNumber,
  formatMoney,
  getAddress
} from '@/utils/helper'
const { Search } = Input
import NotFoundSearch from '@/components/molecules/NotFoundSearch'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/common'
import { CLASS_COVER_IMAGE_DEFAULT } from '@/assets/images'
import { Tooltip } from 'antd'
import CustomHelmet from '@/components/atoms/CustomHelmet'
const { Paragraph } = Typography
function SearchPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { wardData } = useSelector((state) => state.appSlice)
  const dataListClassroom = useSelector((state) => state.userSlice)
  const [searchParams, setSearchParams] = useSearchParams()
  const listSearchRef = useRef(0)
  const params = useMemo(() => {
    const search_value = searchParams.get('search_value') || ''
    const ward = getParamNumber(searchParams.get('ward'), 0)
    const order_by_class = getParamOrder(searchParams.get('order_by_class'))
    const page = getParamNumber(searchParams.get('page'), 1)
    const is_start = getParamZeroOne(searchParams.get('is_start'))
    return { search_value, ward, order_by_class, page, is_start }
  }, [searchParams])
  const wardOptions = useMemo(() => {
    const ward = wardData.wards.map((element) => {
      return { value: element.id, label: element.name }
    })

    ward.unshift({ value: 0, label: t('all') })

    return ward
  }, [wardData])

  useEffect(() => {
    dispatch(requestGetWard())
    const paramInit = {
      ...params,
      search_value: params.search_value,
      page: params.page
    }
    setSearchParams(paramInit)
  }, [])

  useEffect(() => {
    dispatch(requestGetClassroom(params))
  }, [params])

  const handleSetParams = (listParamsChange) => {
    const newParams = params
    listParamsChange.map((item) => {
      newParams[item.key] = item.value
    })

    setSearchParams(newParams)
    if (listSearchRef.current) {
      listSearchRef.current.scrollIntoView()
    }
  }

  const handleSearch = (value) => {
    const listParamsChange = [
      { key: 'page', value: 1 },
      { key: 'search_value', value }
    ]
    handleSetParams(listParamsChange)
  }

  return (
    <>
      <CustomHelmet
        titleHelmet={t('classroom.add_classroom.classroom_search')}
      />
      <Header />
      <div className="content bg-[#f4f4f4] pb-4">
        <Col className="h-48 form__search text-white mt-50">
          <h1 className="text-center py-10">
            {t('classroom.add_classroom.classroom_search')}
          </h1>
          <Col span={16} offset={4}>
            <Search
              placeholder={t('common.placeholder.input_search_class_name_text')}
              allowClear
              defaultValue={params.search_value}
              onSearch={handleSearch}
              enterButton={t('common.button.search')}
              size="large"
              className="w-full"
              color="white"
            />
          </Col>
        </Col>
        <Col span={16} offset={4} className="pt-10">
          {
            <div className="select__group bg-white flex justify-around p-8 border-solid rounded-2xl mb-8">
              <div className="select__item">
                <h3>{t('classroom.add_classroom.classroom_sort_by_name')}</h3>
                <Select
                  className="w-[14rem] mt-2"
                  defaultValue={params.order_by_class}
                  onChange={(value) =>
                    handleSetParams([{ key: 'order_by_class', value }])
                  }
                  options={[
                    {
                      label: t('no_order'),
                      value: ''
                    },
                    {
                      label: t('ascending'),
                      value: 'asc'
                    },
                    {
                      label: t('descending'),
                      value: 'desc'
                    }
                  ]}
                />
              </div>
              <div className="select__item">
                <h3>{t('classroom.add_classroom.classroom_address')}</h3>
                <Select
                  className="w-[14rem] mt-2"
                  defaultValue={params.ward}
                  onChange={(value) =>
                    handleSetParams([{ key: 'ward', value }])
                  }
                  options={wardOptions}
                />
              </div>
              <div className="select__item" ref={listSearchRef}>
                <h3>{t('classroom.add_classroom.classroom_address_status')}</h3>
                <Select
                  className="w-[14rem] mt-2"
                  defaultValue={params.is_start}
                  onChange={(value) =>
                    handleSetParams([{ key: 'is_start', value }])
                  }
                  options={[
                    {
                      label: t('all'),
                      value: ''
                    },
                    {
                      label: t('not_start_yet'),
                      value: 0
                    },
                    {
                      label: t('started'),
                      value: 1
                    }
                  ]}
                />
              </div>
            </div>
          }
        </Col>
        <h3 className="text-center text-[1.2rem] mb-4">
          {t('classroom.add_classroom.classroom_search_result', {
            attribute: dataListClassroom.total
          })}
        </h3>
        <Spin spinning={dataListClassroom.isLoading}>
          {Object.keys(dataListClassroom.data).length === 0 ? (
            <NotFoundSearch />
          ) : (
            <Col span={16} offset={4} className="list__classroom">
              <List
                itemLayout="vertical"
                size="large"
                dataSource={dataListClassroom.data}
                pagination={{
                  size: 'default',
                  total: dataListClassroom.total,
                  onChange: (page) => {
                    handleSetParams([{ key: 'page', value: page }])
                  },
                  defaultPageSize: 15,
                  current: params.page,
                  disabled: dataListClassroom.total < 11
                }}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    className="list__classroom-items bg-white mb-2"
                    style={{ display: 'flex', padding: '.6rem' }}
                  >
                    <Col span={4} className="h-[120px]">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src={item.image?.url || CLASS_COVER_IMAGE_DEFAULT}
                      />
                    </Col>
                    <Col
                      span={13}
                      className="flex flex-col justify-between pl-2"
                    >
                      <a href={`/classroom/${item.id}`} className="text-2xl">
                        {`${item.className} - ${t(
                          'classroom.add_classroom.classroom_teacher'
                        )}: ${item.profileTeacher.user.fullName}`}
                      </a>

                      <Paragraph
                        ellipsis={{
                          rows: 2
                        }}
                      >
                        {item.description}
                      </Paragraph>
                      <div className="font-normal flex">
                        <Col>
                          <Tooltip title={t('classroom.detail.take_place')}>
                            <CalendarOutlined />
                            {` ${dayjs(item.dateStart).format(
                              DATE_FORMAT.DATE_MONTH_YEAR_SLASH
                            )} - ${dayjs(item.dateEnd).format(
                              DATE_FORMAT.DATE_MONTH_YEAR_SLASH
                            )}`}
                          </Tooltip>
                        </Col>
                        <Col offset={1} className="font-semibold">
                          {item?.address.length ? (
                            <Tooltip
                              title={t('classroom.detail.classroom_address')}
                            >
                              <EnvironmentOutlined />
                              {getAddress(item.address)}
                            </Tooltip>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col offset={1} className="font-semibold">
                          <Tooltip
                            title={t('classroom.detail.classroom_quantity')}
                          >
                            <UserOutlined />
                            {` ${item.countStudentsInClass || 0}/${
                              item.quantity
                            }`}
                          </Tooltip>
                        </Col>
                      </div>
                    </Col>
                    <Col
                      span={7}
                      className="rate text-right font-bold flex flex-col justify-around"
                    >
                      <Rate
                        allowHalf
                        value={item.avgStar || 0}
                        disabled
                        className="text-2xl"
                      />
                      <p className="font-normal">
                        {item.countRate || 0}
                        {` ${t('classroom.detail.reviews')}`}
                      </p>
                      <div className="flex items-center justify-end">
                        <h3 className="text-[#ff5100]">
                          {`${t(
                            'classroom.add_classroom.classroom_tuition_fee'
                          )}: ${formatMoney(item.tuitionFee)}`}
                        </h3>
                        <Button
                          type="primary"
                          className="ml-4"
                          onClick={() => {
                            navigate(`/classroom/${item.id}`)
                          }}
                        >
                          {t('classroom.add_classroom.classroom_detail')}
                          <RightOutlined />
                        </Button>
                      </div>
                    </Col>
                  </List.Item>
                )}
              />
            </Col>
          )}
        </Spin>
      </div>
      <Footer />
    </>
  )
}

export default SearchPage
