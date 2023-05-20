import Footer from '@/layouts/admin/Footer'
import Header from '@/layouts/admin/Header'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  requestVerifyEmail,
  removeAuthInfo
} from '@/redux/reducers/authReducers'
import { setStatusVerifyEmail } from '@/redux/reducers/authReducers'
import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const VerifyEmailTemp = () => {
  const { t } = useTranslation()
  const [param] = useSearchParams()
  const { verifyEmail, isLoading } = useSelector((state) => state.authSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(removeAuthInfo())
    const tokenParam = param.get('token')
    const dataVerifyEmail = { token: tokenParam }
    if (tokenParam) {
      dispatch(requestVerifyEmail(dataVerifyEmail))
    } else {
      dispatch(setStatusVerifyEmail(false))
    }

    return () => {
      dispatch(setStatusVerifyEmail(false))
    }
  }, [])

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <div>
        <Header />
      </div>
      <div className="w-full text-center space-y-10">
        <Spin spinning={isLoading}>
          <div className="text-base font-medium">
            {verifyEmail.status
              ? t('congrats_verify', { name: verifyEmail.data?.full_name })
              : t('something_wrong')}
          </div>
        </Spin>
      </div>
      <div>
        <div className="w-full text-center mb-20">
          {t('back_to')}
          <Link to="/">{t('home_page')}</Link>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default VerifyEmailTemp
