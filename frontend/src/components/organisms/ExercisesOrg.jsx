// import DetailTest from '@/components/molecules/DetailTest'
import { useTranslation } from 'react-i18next'
import { Button, Input, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import InputExercise from '@/components/molecules//InputExercise'
import ExercisesTable from '@/components/molecules/ExercisesTable'

//TODO_BETA
const ExerciseOrg = () => {
  const { t } = useTranslation()
  const { Search } = Input
  const { listExercises } = useSelector((state) => state.fakeDataSlice)
  const [isModalCreateTest, setIsModalCreateTest] = useState(false)
  // const [isModalDetailTest, setIsModalDetailTest] = useState(false)
  // const [dataTestDetail, setDataTestDetail] = useState({})
  const [dataTest, setDataTest] = useState({
    title: null,
    description: null,
    listExercises: []
  })

  const handleModalCreateTest = (status) => {
    setIsModalCreateTest(status)
  }

  return (
    <div>
      <div className="w-full flex justify-end absolute">
        <Button
          className="mt-[-92px]"
          type="primary"
          onClick={() => handleModalCreateTest(true)}
        >
          {t('exercise.add_exercise')}
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
        <ExercisesTable listTests={listExercises} />
      </div>
      <Modal
        title={t('exercise.add_exercise')}
        open={isModalCreateTest}
        onCancel={() => handleModalCreateTest(false)}
        footer={null}
        destroyOnClose
        width={1000}
      >
        <InputExercise
          dataTest={dataTest}
          onModalCreateTest={handleModalCreateTest}
          setDataTest={setDataTest}
        />
      </Modal>
    </div>
  )
}

export default ExerciseOrg
