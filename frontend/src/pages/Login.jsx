import { useTranslation } from 'react-i18next'
import { Form, Input, Row, Card, Spin, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import PrimaryButton from '@/components/atoms/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { requestLogin } from '@/redux/reducers/authReducers'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '@/constants/common'
import { getLocalStorage, USER_TOKEN } from '@/utils/storage'
import { Link } from 'react-router-dom'
import CustomHelmet from '@/components/atoms/CustomHelmet'
const { Title } = Typography
export default function Login() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isLoading, token, role } = useSelector((state) => state.authSlice)
  const localStorageToken = getLocalStorage(USER_TOKEN)
  const onSubmit = (data) => {
    dispatch(requestLogin(data))
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (token || localStorageToken) {
      if (role === ROLES.ADMIN) {
        return navigate('/admin/teachers')
      }
      return navigate('/')
    }
  }, [token])

  return (
    <div className="bg-sky-300">
      <CustomHelmet titleHelmet={t('common.button.login')} />

      <Spin spinning={isLoading}>
        <Row align="middle" justify="center" className="min-h-screen">
          <Card className="rounded-3xl w-[400px]">
            <div className="text-center py-4">
              <Title level={1}>{t('common.button.login')}</Title>
            </div>
            <Form name="normal_login" onFinish={onSubmit}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: t('error_messages.required', {
                      attribute: t('common.form.username').toLowerCase()
                    })
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t('common.placeholder.please_input', {
                    attribute: t('common.form.username').toLowerCase()
                  })}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('error_messages.required', {
                      attribute: t('common.form.password').toLowerCase()
                    })
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder={t('common.placeholder.please_input', {
                    attribute: t('common.form.password').toLowerCase()
                  })}
                />
              </Form.Item>
              <Form.Item>
                <div className="pt-5">
                  <PrimaryButton
                    type="primary"
                    htmlType="submit"
                    name={t('common.button.login')}
                  />
                </div>
              </Form.Item>
              <p className="text-zinc-500 text-center">
                {t('common.form.no_account')}{' '}
                <Link to="/register">{t('common.button.register')}</Link>
              </p>
            </Form>
          </Card>
        </Row>
      </Spin>
    </div>
  )
}
