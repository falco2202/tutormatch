import {
  FacebookFilled,
  GoogleOutlined,
  HomeOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
function Footer() {
  const { t } = useTranslation()
  const socialIcon = [
    {
      key: 1,
      icon: <FacebookFilled />
    },
    {
      key: 2,
      icon: <GoogleOutlined />
    },
    {
      key: 3,
      icon: <LinkedinOutlined />
    },
    {
      key: 4,
      icon: <TwitterOutlined />
    }
  ]
  const contact = {
    address: '77 Nguyễn Huệ, Thành phố Huế, Thừa Thiên Huế',
    email: 'tutormatch@example.com',
    phone: '0966164072'
  }
  return (
    <div className="footer flex flex-col justify-between text-[#7c7c7c]">
      <Col span={16} offset={4}>
        <Row className="mb-4">
          <Col span={10} className="information">
            <h3 className="text-[#ccc] mb-2">{t('about')}</h3>
            <p>{t('introduction')}</p>
          </Col>
          <Col span={4} offset={3} className="contact">
            <h3 className="text-[#ccc] mb-2">{t('contact')}</h3>
            <ul className="list-none contact__list">
              <li className="flex">
                <PhoneOutlined className="mr-2 text-[1.1rem]" />
                <p>{contact.phone}</p>
              </li>
              <li className="flex">
                <MailOutlined className="mr-2 text-[1.1rem]" />
                <p>{contact.email}</p>
              </li>
              <li className="flex">
                <HomeOutlined className="mr-2  text-[1.1rem]" />
                <p>{contact.address}</p>
              </li>
            </ul>
          </Col>
          <Col span={4} offset={3} className="quick-link">
            <h3 className="text-[#ccc] mb-2">{t('link.title')}</h3>

            <ul className="list-none quick-link__list">
              <li>
                <Link className="text-[#7c7c7c]" to="/payment-guide">
                  {t('link.payment_guide')}
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="copyright flex justify-between items-center pt-4">
          <Col>
            <p className=" ">
              Copyright © 2023 Rikkeisoft Hue City. All rights reserved.
            </p>
          </Col>
          <Col className="social-icon flex">
            {socialIcon.map((item) => (
              <Link to="/" className="social-icon__item" key={item.key}>
                {item.icon}
              </Link>
            ))}
          </Col>
        </Row>
      </Col>
    </div>
  )
}

export default Footer
