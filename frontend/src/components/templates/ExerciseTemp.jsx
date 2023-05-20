import Title from '@/components/atoms/Title'
import TestsOrg from '@/components/organisms/TestsOrg'
import QuestionsOrg from '@/components/organisms/QuestionsOrg'
import { useTranslation } from 'react-i18next'
import { Tabs } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import ExerciseOrg from '@/components/organisms/ExercisesOrg'

//TODO_BETA
const ExerciseTemp = () => {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()

  const paramsPage = useMemo(() => {
    const tabs = params.get('tabs') || 'tests'

    return { tabs }
  }, [params])

  const items = [
    {
      key: 'tests',
      label: t('exercise.tests'),
      children: <TestsOrg />
    },
    {
      key: 'questions',
      label: t('exercise.questions'),
      children: <QuestionsOrg />
    },
    {
      key: 'exercises',
      label: t('exercise.exercises'),
      children: <ExerciseOrg />
    }
  ]

  const onChange = (key) => {
    const param = {
      tabs: key
    }
    setParams(param)
  }

  return (
    <div>
      <Title title={t('exercise.exercise')} />
      <div className="p-10">
        <Tabs
          defaultActiveKey={paramsPage.tabs}
          items={items}
          onChange={(key) => onChange(key)}
        />
      </div>
    </div>
  )
}

export default ExerciseTemp
