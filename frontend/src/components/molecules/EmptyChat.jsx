import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function EmptyChat() {
  const { t } = useTranslation()
  return (
    <div className="h-[800px] flex justify-center items-center rounded-r-xl">
      <Typography.Title level={4}>
        {t('common.title.not_select_conversation')}
      </Typography.Title>
    </div>
  )
}
