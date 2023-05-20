import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import StepInfoTest from './StepInfoTest';
import StepTakeTheTest from './StepTakeTheTest';
import StepResult from './StepResult';
import { convertNumberToTime } from '@/utils/helper';
import { changeStatus } from '@/redux/reducers/fakeDataReducers';

//TODO_BETA
const TakeTestTemp = () => {
  const { id } = useParams()
  const { listHomeworks } = useSelector((state) => state.fakeDataSlice)
  const dispatch = useDispatch()
  const [dataTest, setDataTest] = useState({})
  const [stepTakeTest, setStepTakeTest] = useState(0)
  const [indexQuestion, setIndexQuestion] = useState(0)
  const [time, setTime] = useState({
    minute: 0,
    second: 0
  })

  const takeTestStep = [
    <StepInfoTest
      key="info-test"
      onNextStepTakeTest={handleNextStepTakeTest}
      dataTest={dataTest}
    />,
    <StepTakeTheTest
      key="take-test"
      onNextStepTakeTest={handleNextStepTakeTest}
      listQuestions={dataTest.listQuestions}
      onNextQuestion={handleNextQuestion}
      indexQuestion={indexQuestion}
      time={time}
    />,
    <StepResult key="result" dataTest={dataTest} />
  ]

  useEffect(() => {
    const findListQuestionsById = listHomeworks.find((element) => element.id === parseInt(id))
    setDataTest(findListQuestionsById)
  }, [listHomeworks])

  useEffect(() => {
    const timeString = convertNumberToTime(dataTest?.listQuestions
      ? dataTest.listQuestions[indexQuestion].time
      : 0
    )
    const time = timeString.split(':')
    setTime({
      minute: parseInt(time[0]),
      second: parseInt(time[1]),
    })
  }, [indexQuestion, dataTest])

  function handleNextStepTakeTest() {
    if (stepTakeTest < 3) {
      if (stepTakeTest === 1) {
        dispatch(changeStatus(parseInt(id)))
      }
      setStepTakeTest(stepTakeTest + 1)
    }
  }

  function handleNextQuestion() {
    if (indexQuestion < dataTest.listQuestions.length - 1)
      setIndexQuestion(indexQuestion + 1)
    else {
      handleNextStepTakeTest()
    }
  }

  return (
    <div>
      <div>
        {takeTestStep[stepTakeTest]}
      </div>
    </div>
  )
}

export default TakeTestTemp;
