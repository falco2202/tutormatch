import { CLASS_COVER_IMAGE_DEFAULT } from '@/assets/images'
import { DATE_FORMAT } from '@/constants/common'
import { formatMoney, getAddress } from '@/utils/helper'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Rate, Typography, Card } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const { Paragraph, Title } = Typography
const CardItem = ({ item }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Card
      className="list__classroom-card h-full"
      onClick={() => {
        navigate(`/classroom/${item.id}`)
      }}
      cover={
        <img
          className="list__classroom-img"
          src={item?.image?.url || CLASS_COVER_IMAGE_DEFAULT}
          alt={item.className}
        />
      }
      bordered={false}
    >
      <div className="list__classroom-content text-left h-[320px]">
        <span>
          <Rate
            allowHalf
            value={item.avgStar}
            disabled
            className="text-[.9rem]"
          />
          <span className="mt-1 ml-1 text-[.8rem]">
            ({item.countRate} {t('classroom.detail.reviews')})
          </span>
        </span>
        <Title
          level={3}
          className="!text-[#0369a1] !font-semibold"
          ellipsis={{
            rows: 2
          }}
        >
          {item.className}
        </Title>
        <h3 className="mb-2">
          <UserOutlined className="mr-2 text-xl w-4 text-left" />
          {item.profileTeacher?.user?.fullName}
        </h3>
        <Paragraph className=" mt-2">
          <CalendarOutlined className="w-5 text-left" />
          {` ${dayjs(item.dateStart).format(
            DATE_FORMAT.DATE_MONTH_YEAR_SLASH
          )} - ${dayjs(item.dateEnd).format(
            DATE_FORMAT.DATE_MONTH_YEAR_SLASH
          )}`}
        </Paragraph>
        {item?.address?.length ? (
          <Paragraph
            className="font-semibold"
            ellipsis={{
              rows: 1
            }}
          >
            <EnvironmentOutlined className="w-5 text-left" />
            {getAddress(item.address)}
          </Paragraph>
        ) : (
          ''
        )}
        <div className="flex justify-between items-center">
          <p className=" text-[.7rem]">
            {t('common.form.quantity')}:
            {` ${item.countStudentsInClass || 0}/${item.quantity}`}
          </p>
          <h3 className=" text-[#ff5100]">{formatMoney(item.tuitionFee)}</h3>
        </div>
      </div>
    </Card>
  )
}

export default CardItem
