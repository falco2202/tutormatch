import HomeworkTable from '@/components/molecules/HomeworkTable';
import ResultClass from '@/components/molecules/ResultClass';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Modal } from 'antd';
import DetailResult from '@/components/molecules/DetailResult';


//TODO_BETA
const HomeworkOrg = () => {
  const { t } = useTranslation()
  const { Search } = Input
  const [isModalResult, setIsModalResult] = useState(false)
  const [isModalDetailResult, setIsModalDetailResult] = useState(false)
  const [dataDetailResult, setDataDetailResult] = useState({})

  const handleModalResult = (status) => {
    setIsModalResult(status)
  }

  const handleModalDetailResult = (status) => {
    setIsModalDetailResult(status)
    if (!status)
      handleModalResult(true)
  }
  return (
    <div>
      <div className="form__handle">
        <Search
          className="w-full"
          placeholder={t('classroom.homework.test')}
          enterButton
        />
      </div>
      <div>
        <HomeworkTable
          onModalResult={handleModalResult}
        />
      </div>
      <Modal
        title={t('classroom.homework.result')}
        open={isModalResult}
        onCancel={() => handleModalResult(false)}
        footer={null}
        destroyOnClose
        width={700}>
        <ResultClass
          setDataDetailResult={setDataDetailResult}
          onModalResult={handleModalResult}
          onModalDetailResult={handleModalDetailResult}
        />
      </Modal>
      <Modal
        open={isModalDetailResult}
        onCancel={() => handleModalDetailResult(false)}
        footer={null}
        destroyOnClose
        width={1000}>
        <DetailResult
          dataDetailResult={dataDetailResult}
          onModalDetailResult={handleModalDetailResult}
        />
      </Modal>
    </div>
  )
}

export default HomeworkOrg;
