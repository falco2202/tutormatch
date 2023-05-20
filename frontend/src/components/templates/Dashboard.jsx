import { useTranslation } from 'react-i18next'

import Title from '@/components/atoms/Title'

export default function Dashboard() {
  const { t } = useTranslation()
  return (
    <div>
      <Title title={t('dashboard.title')} />
    </div>
  )
}
