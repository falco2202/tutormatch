import TestsTable from '@/components/molecules/TestsTable';
import InputTest from '@/components/molecules/InputTest';
import DetailTest from '@/components/molecules/DetailTest';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useState } from 'react';

//TODO_BETA
const TestsOrg = () => {
  const { t } = useTranslation()
  const { Search } = Input
  const { listTests } = useSelector((state) => state.fakeDataSlice)
  const [isModalCreateTest, setIsModalCreateTest] = useState(false)
  const [isModalDetailTest, setIsModalDetailTest] = useState(false)
  const [dataTestDetail, setDataTestDetail] = useState({})
  const [dataTest, setDataTest] = useState({
    title: null,
    subject: null,
    description: null,
    listQuestions: []
  })

  const handleModalCreateTest = (status) => {
    setIsModalCreateTest(status)
  }

  const handleModalDetailTest = (status) => {
    setIsModalDetailTest(status)
  }

  return (
    <div>
      <div className="w-full flex justify-end absolute">
        <Button
          className="mt-[-92px]"
          type="primary" 
          onClick={() => handleModalCreateTest(true)}>
          {t('exercise.add_tests')}
        </Button>
      </div>
      <div className="form__handle">
        <Search
          className="w-full"
          placeholder={t('exercise.input_tests')}
          enterButton
        />
      </div>
      <div>
        <TestsTable
          listTests={listTests}
          setDataTestDetail={setDataTestDetail}
          onModalDetailTest={handleModalDetailTest}
        />
      </div>
      <Modal
        title={t('exercise.add_tests')}
        open={isModalCreateTest}
        onCancel={() => handleModalCreateTest(false)}
        footer={null}
        destroyOnClose
        width={1000}>
        <InputTest
          dataTest={dataTest}
          onModalCreateTest={handleModalCreateTest}
          setDataTest={setDataTest}
        />
      </Modal>
      <Modal
        title={t('exercise.detail_test')}
        open={isModalDetailTest}
        onCancel={() => handleModalDetailTest(false)}
        footer={null}
        destroyOnClose
        width={1000}>
        <DetailTest
          dataTestDetail={dataTestDetail}
          onModalDetailTest={handleModalDetailTest}
          setDataTestDetail={setDataTestDetail}
        />
      </Modal>
    </div>
  )
}

export default TestsOrg;
