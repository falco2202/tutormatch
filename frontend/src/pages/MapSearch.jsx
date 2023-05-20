import { CLASS_COVER_IMAGE_DEFAULT, MAP_CLASS } from '@/assets/images'
import BookIconLocation from '@/components/atoms/BookIconLocation'
import Header from '@/layouts/admin/Header'
import { Popconfirm, Button, Input, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CLASS_ICON } from '@/assets/icons'
const { Search } = Input
//TODO_BETA: Chức năng tìm kiếm lớp học trên map, đang set cứng toàn bộ dữ liệu
const MapSearch = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <>
      <Header />
      <div className="content content__map">
        <img src={MAP_CLASS} alt="" width="100%" />
        <div className="absolute top-[34rem] left-[73rem] cursor-pointer">
          <Popconfirm
            placement="top"
            title={<h3 className="ml-3">Sinh học lớp 8</h3>}
            description={
              <>
                <img
                  src={CLASS_COVER_IMAGE_DEFAULT}
                  width={300}
                  className="mr-5"
                  alt=""
                />
                <div className="flex">
                  <div className="mr-4">
                    <h3>{`${t('common.form.teacher')}:`}</h3>
                    <h4>{`${t('common.form.email')}:`}</h4>
                    <h4>{`${t('common.form.phone')}:`}</h4>
                    <h4>{`${t('common.form.address')}:`}</h4>
                  </div>
                  <div>
                    <h3 className="font-normal">Phan Lan Anh</h3>
                    <h4 className="font-normal">phanlananh@example.com</h4>
                    <h4 className="font-normal">0899233412</h4>
                    <h4 className="font-normal">35 Đống Đa, Vĩnh Ninh, Huế</h4>
                  </div>
                </div>
              </>
            }
            icon={false}
            okText={t('common.form.detail')}
            showCancel={false}
            onConfirm={() => {
              navigate('/classroom/1')
            }}
          >
            <button className="border-none bg-transparent">
              <BookIconLocation />
            </button>
          </Popconfirm>
        </div>

        <div className="absolute top-[47.5rem] left-[62.5rem] cursor-pointer">
          <Popconfirm
            placement="top"
            title={<h3 className="ml-3">Anh văn lớp 7</h3>}
            description={
              <>
                <img
                  alt=""
                  src={CLASS_COVER_IMAGE_DEFAULT}
                  width={300}
                  className="mr-5"
                />
                <Row className="flex">
                  <Col span={7}>
                    <h3 className="mb-1">{`${t('common.form.teacher')}:`}</h3>
                    <h4>{`${t('common.form.email')}:`}</h4>
                    <h4>{`${t('common.form.phone')}:`}</h4>
                    <h4>{`${t('common.form.address')}:`}</h4>
                  </Col>
                  <Col span={16}>
                    <h3 className="font-normal mb-1">Nguyễn Quỳnh Lan</h3>
                    <h4 className="font-normal">nguyenquynhlan@example.com</h4>
                    <h4 className="font-normal">0899235002</h4>
                    <h4 className="font-normal">
                      8 Nguyễn Trường Tộ, Phước Vĩnh, Huế
                    </h4>
                  </Col>
                </Row>
              </>
            }
            icon={false}
            okText={t('common.form.detail')}
            showCancel={false}
            onConfirm={() => {
              navigate('/classroom/4')
            }}
          >
            <button className="border-none bg-transparent">
              <BookIconLocation />
            </button>
          </Popconfirm>
        </div>

        <div className="absolute top-[27rem] left-[35rem] cursor-pointer">
          <Popconfirm
            placement="top"
            title={<h3 className="ml-3">Ngữ Văn lớp 8</h3>}
            description={
              <>
                <img
                  alt=""
                  src={CLASS_COVER_IMAGE_DEFAULT}
                  width={300}
                  className="mr-5"
                />
                <Row className="flex">
                  <Col span={7}>
                    <h3 className="mb-1">{`${t('common.form.teacher')}:`}</h3>
                    <h4>{`${t('common.form.email')}:`}</h4>
                    <h4>{`${t('common.form.phone')}:`}</h4>
                    <h4>{`${t('common.form.address')}:`}</h4>
                  </Col>
                  <Col span={16}>
                    <h3 className="font-normal mb-1">Đỗ Thị Thúy</h3>
                    <h4 className="font-normal">dothithuy@example.com</h4>
                    <h4 className="font-normal">0899235232</h4>
                    <h4 className="font-normal">
                      52 Nguyễn Cư Trinh, Thuận Hòa, Huế
                    </h4>
                  </Col>
                </Row>
              </>
            }
            icon={false}
            okText={t('common.form.detail')}
            showCancel={false}
            onConfirm={() => {
              navigate('/classroom/4')
            }}
          >
            <button className="border-none bg-transparent">
              <BookIconLocation />
            </button>
          </Popconfirm>
        </div>

        <div className="absolute top-[42rem] left-[63rem] cursor-pointer">
          <Popconfirm
            placement="top"
            title={<h3 className="ml-3">Toán lớp 1</h3>}
            description={
              <>
                <img
                  alt=""
                  src={CLASS_COVER_IMAGE_DEFAULT}
                  width={300}
                  className="mr-5"
                />
                <Row className="flex">
                  <Col span={7}>
                    <h3 className="mb-1">{`${t('common.form.teacher')}:`}</h3>
                    <h4>{`${t('common.form.email')}:`}</h4>
                    <h4>{`${t('common.form.phone')}:`}</h4>
                    <h4>{`${t('common.form.address')}:`}</h4>
                  </Col>
                  <Col span={16}>
                    <h3 className="font-normal mb-1">Hoàng Ngọc Long</h3>
                    <h4 className="font-normal">hoanglong230523@example.com</h4>
                    <h4 className="font-normal">0966164072</h4>
                    <h4 className="font-normal">
                      49 Nguyễn Huệ, Vĩnh Ninh, Huế
                    </h4>
                  </Col>
                </Row>
              </>
            }
            icon={false}
            okText={t('common.form.detail')}
            showCancel={false}
            onConfirm={() => {
              navigate('/classrooms/4')
            }}
          >
            <button className="border-none bg-transparent">
              <BookIconLocation />
            </button>
          </Popconfirm>
        </div>

        <div className="absolute top-[41.5rem] left-[68rem] cursor-pointer">
          <Popconfirm
            placement="top"
            title={<h3 className="ml-3">Toán lớp 2</h3>}
            description={
              <>
                <img
                  alt=""
                  src={CLASS_COVER_IMAGE_DEFAULT}
                  width={300}
                  className="mr-5"
                />
                <Row className="flex">
                  <Col span={7}>
                    <h3 className="mb-1">{`${t('common.form.teacher')}:`}</h3>
                    <h4>{`${t('common.form.email')}:`}</h4>
                    <h4>{`${t('common.form.phone')}:`}</h4>
                    <h4>{`${t('common.form.address')}:`}</h4>
                  </Col>
                  <Col span={16}>
                    <h3 className="font-normal mb-1">Hoàng Ngọc Long</h3>
                    <h4 className="font-normal">hoanglong230523@example.com</h4>
                    <h4 className="font-normal">0966164072</h4>
                    <h4 className="font-normal">
                      80 Nguyễn Huệ, Vĩnh Ninh, Huế
                    </h4>
                  </Col>
                </Row>
              </>
            }
            icon={false}
            okText={t('common.form.detail')}
            showCancel={false}
            onConfirm={() => {
              navigate('/classrooms/4')
            }}
          >
            <button className="border-none bg-transparent">
              <BookIconLocation />
            </button>
          </Popconfirm>
        </div>
        <div className="absolute top-[20rem] left-[88rem] cursor-pointer">
          <Popconfirm
            placement="top"
            title={<h3 className="ml-3">Toán lớp 2</h3>}
            description={
              <>
                <img
                  alt=""
                  src={CLASS_COVER_IMAGE_DEFAULT}
                  width={300}
                  className="mr-5"
                />
                <Row className="flex">
                  <Col span={7}>
                    <h3 className="mb-1">{`${t('common.form.teacher')}:`}</h3>
                    <h4>{`${t('common.form.email')}:`}</h4>
                    <h4>{`${t('common.form.phone')}:`}</h4>
                    <h4>{`${t('common.form.address')}:`}</h4>
                  </Col>
                  <Col span={16}>
                    <h3 className="font-normal mb-1">Hoàng Ngọc Long</h3>
                    <h4 className="font-normal">hoanglong230523@example.com</h4>
                    <h4 className="font-normal">0966164072</h4>
                    <h4 className="font-normal">
                      80 Nguyễn Huệ, Vĩnh Ninh, Huế
                    </h4>
                  </Col>
                </Row>
              </>
            }
            icon={false}
            okText={t('common.form.detail')}
            showCancel={false}
            onConfirm={() => {
              navigate('/classrooms/4')
            }}
          >
            <button className="border-none bg-transparent">
              <BookIconLocation />
            </button>
          </Popconfirm>
        </div>
        <div className="absolute top-[40rem] left-[88rem] cursor-pointer">
          <Popconfirm
            placement="top"
            title={<h3 className="ml-3">Toán lớp 2</h3>}
            description={
              <>
                <img
                  alt=""
                  src={CLASS_COVER_IMAGE_DEFAULT}
                  width={300}
                  className="mr-5"
                />
                <Row className="flex">
                  <Col span={7}>
                    <h3 className="mb-1">{`${t('common.form.teacher')}:`}</h3>
                    <h4>{`${t('common.form.email')}:`}</h4>
                    <h4>{`${t('common.form.phone')}:`}</h4>
                    <h4>{`${t('common.form.address')}:`}</h4>
                  </Col>
                  <Col span={16}>
                    <h3 className="font-normal mb-1">Hoàng Ngọc Long</h3>
                    <h4 className="font-normal">hoanglong230523@example.com</h4>
                    <h4 className="font-normal">0966164072</h4>
                    <h4 className="font-normal">
                      80 Nguyễn Huệ, Vĩnh Ninh, Huế
                    </h4>
                  </Col>
                </Row>
              </>
            }
            icon={false}
            okText={t('common.form.detail')}
            showCancel={false}
            onConfirm={() => {
              navigate('/classrooms/4')
            }}
          >
            <button className="border-none bg-transparent">
              <BookIconLocation />
            </button>
          </Popconfirm>
        </div>
        <div className="absolute top-28 left-8 flex">
          <Search
            className="w-[500px]"
            placeholder={t('common.placeholder.input_search_text')}
            allowClear
          />
          <Button className="ml-2 flex items-center text-[#949494] rounded-2xl">
            <img alt="" src={CLASS_ICON} width={16} />
            <span className="ml-2">Các lớp gần tôi</span>
          </Button>
          <Button className="ml-2 text-[#949494] rounded-2xl">
            <span>Toán lớp 9</span>
          </Button>
          <Button className="ml-2 text-[#949494] rounded-2xl">
            <span>Văn lớp 9</span>
          </Button>
          <Button className="ml-2 text-[#949494] rounded-2xl">
            <span>Tiếng anh lớp 9</span>
          </Button>
        </div>
        <Button
          className="absolute bottom-4 left-4"
          type="primary"
          danger
          onClick={handleClick}
        >
          {t('common.button.back')}
        </Button>
      </div>
    </>
  )
}

export default MapSearch
