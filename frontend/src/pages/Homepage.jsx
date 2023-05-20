import Header from '@/layouts/admin/Header'
import Footer from '@/layouts/admin/Footer'
import { Row, Col, Input, List, Typography, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDataList } from '@/hooks/useDataList'
import { requestGetClassroom } from '@/redux/reducers/userReducers'
import { convertDataSource } from '@/utils/helper'
import ChatPopUp from '@/layouts/ChatPopUp'
import { useRef } from 'react'
import { getLocalStorage } from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { USER_ROLE } from '@/constants/defaultValue'
import { ROLES } from '@/constants/common'
import CardItem from '@/components/atoms/CardItem'
import { isEmpty } from 'lodash'
import { MAP_SEARCH_ICON } from '@/assets/icons'
import CustomHelmet from '@/components/atoms/CustomHelmet'
const { Search } = Input

function Homepage() {
  const { t } = useTranslation()
  const { role } = useSelector((state) => state.authSlice)

  const listRef = useRef(0)
  const roleId = role || +getLocalStorage(USER_ROLE)

  const navigate = useNavigate()
  const { data, params, setParams, pageSize, total, totalPage } =
    useDataList(requestGetClassroom)
  const handlePagination = (pagination) => {
    const newParams = {
      ...params,
      page: pagination
    }
    setParams(newParams)
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const dataSource = convertDataSource(data)

  const handleSearch = (value) => {
    navigate(`search?search_value=${value}`)
  }
  //TODO_BETA: hàm này dùng để navigate sang page MapSearch
  const handleMapSearch = () => {
    navigate('search-map')
  }

  return (
    <div className="bg-[#f4f4f4]">
      <CustomHelmet />
      <Header />
      <div className="content">
        <Row className="search__container" justify="center">
          <Col
            span={16}
            className="search__form text-center text-white mt-16 flex flex-col items-center"
          >
            <Col xl={14} className="text-4xl mb-4 font-semibold leading-normal">
              <p>{t('homepage.together_with_tutormatch').toUpperCase()}</p>
              <p>{t('homepage.academic_challenge').toUpperCase()}</p>
            </Col>
            <Col xl={18}>
              <p className="text-[1.4rem] font-normal">
                {t('homepage.introduce')}
              </p>
            </Col>
          </Col>
          <Col xl={12} md={20} className="flex mt-16">
            <Search
              placeholder={t('common.placeholder.input_search_class_name_text')}
              allowClear
              enterButton={t('common.button.search')}
              size="large"
              className="w-full"
              color="white"
              onSearch={handleSearch}
            />
            {/* TODO_BETA: button dùng để navigate sang tìm kiếm bản đồ */}
            <Button
              type="primary"
              className="h-[40px] ml-1 text-[1rem] flex items-center justify-around"
              onClick={handleMapSearch}
            >
              {t('common.button.search_for_map')}
              <img src={MAP_SEARCH_ICON} className="ml-1" alt="search_map" />
            </Button>
          </Col>
        </Row>
        <Row className="list__classroom my-8" justify="center" ref={listRef}>
          <Col span={24}>
            <Typography.Title
              level={2}
              className="text-center pb-8 list__classroom-title"
            >
              {t('homepage.list_class')}
            </Typography.Title>
          </Col>
          <Col xl={16} md={20} xs={24}>
            {!isEmpty(dataSource) && (
              <List
                pagination={{
                  pageSize: pageSize,
                  align: 'center',
                  onChange: handlePagination,
                  total: total,
                  totalPage: totalPage
                }}
                grid={{
                  gutter: 16,
                  xs: 1,
                  lg: 2,
                  xl: 3,
                  xxl: 4
                }}
                dataSource={dataSource}
                renderItem={(item) => (
                  <List.Item>
                    <CardItem item={item} />
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </div>
      {roleId === ROLES.TEACHER && <ChatPopUp />}
      <Footer />
    </div>
  )
}

export default Homepage
