import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function EmptyNotification() {
  const { t } = useTranslation()
  return (
    <div className="h-[200px] w-[360px] flex justify-center items-center rounded-r-xl">
      <Typography.Title level={4}>
        {t('common.title.no_notifications')}
      </Typography.Title>
    </div>
  )
}
