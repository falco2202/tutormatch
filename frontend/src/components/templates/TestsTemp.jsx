import Title from '@/components/atoms/Title';
import TestsTableOrg from '@/components/organisms/TestsTableOrg';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';

//TODO_BETA
const TestsTemp = () => {
  const { t } = useTranslation()
  const { Search } = Input
  return (
    <div>
      <Title title={t('tests.tests')} />
      <div className="p-10 pt-0">
        <div className="form__handle">
          <Search
            className="w-full"
            placeholder={t('exercise.input_tests')}
            enterButton
          />
        </div>
        <div>
          <TestsTableOrg />
        </div>
      </div>
    </div>
  )
}

export default TestsTemp;
