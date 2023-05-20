import { MOMO_PAYMENT } from '@/assets/images'
import Footer from '@/layouts/admin/Footer'
import Header from '@/layouts/admin/Header'
import { Col, Row, Image, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CustomHelmet from '@/components/atoms/CustomHelmet'
const { Title, Paragraph } = Typography
const PaymentGuideTemp = () => {
  const { t } = useTranslation()
  const steps = [
    {
      attribute: 1,
      stepPayment: 'step_one'
    },
    {
      attribute: 2,
      stepPayment: 'step_two'
    },
    {
      attribute: 3,
      stepPayment: 'step_three'
    },
    {
      attribute: 4,
      stepPayment: 'step_four'
    }
  ]
  return (
    <>
      <Header />
      <CustomHelmet />
      <div className="content">
        <Row justify="center">
          <Col span={16} className="flex flex-col">
            <Title color="red" level={2} className="my-2 !text-[#b83491]">
              {t('payment.title')}
            </Title>
            <Paragraph className="text-xl font-semibold text-[#5e5e5e]">
              {t('payment.guide')}
            </Paragraph>
            <Image
              src={MOMO_PAYMENT}
              className="self-center"
              preview={false}
              width="75%"
            />
            <Paragraph className="text-[1rem] text-[#5e5e5e] mt-2">
              {t('payment.step_payment')}
            </Paragraph>
            {steps &&
              steps.map((step) => (
                <Paragraph
                  className="text-[1rem] text-[#5e5e5e]"
                  key={step.attribute}
                >
                  <strong>
                    {t('payment.step', { attribute: step.attribute })}
                  </strong>
                  {t(`payment.${step.stepPayment}`)}
                </Paragraph>
              ))}
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}
export default PaymentGuideTemp
