import FindTest from '@/components/molecules/FindTest';
import GiveHomework from '@/components/molecules/GiveHomework';
import { useState } from 'react';


//TODO_BETA
const HomeworkSendOrg = (props) => {
  const [stepGiveHomework, setStepGiveHomework] = useState(0)
  const [dataHomework, setDataHomework] = useState({
    title: null,
    subject: null,
    description: null,
    listQuestions: []
  })

  const handleNextStepGiveHomework = () => {
    if (stepGiveHomework < giveHomeworkStep.length)
      setStepGiveHomework(stepGiveHomework + 1)
  }

  const handlePreviousStepGiveHomework = () => {
    if (stepGiveHomework > 0)
      setStepGiveHomework(stepGiveHomework - 1)
  }

  const giveHomeworkStep = [
    <FindTest
      key="find-test"
      setDataHomework={setDataHomework}
      onNextStepGiveHomework={handleNextStepGiveHomework}
    />,
    <GiveHomework
      key='give-homework'
      dataHomework={dataHomework}
      onPreviousStepGiveHomework={handlePreviousStepGiveHomework}
      onModalHomework={props.onModalHomework}
    />
  ]

  return (
    <div>
      <div>
        {giveHomeworkStep[stepGiveHomework]}
      </div>
    </div>
  )
}

export default HomeworkSendOrg;
