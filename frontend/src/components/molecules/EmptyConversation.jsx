import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function EmptyConversation() {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <Typography.Title level={5}>
        {t('error_messages.no_conversation')}
      </Typography.Title>
      <Typography.Text>{t('error_messages.please_try')}</Typography.Text>
    </div>
  )
}
