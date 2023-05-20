import InfoTest from '@/components/molecules/InfoTest';
import InputTest from '@/components/molecules/InputTest';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react';

const DetailTest = (props) => {
  const { t } = useTranslation()
  const [isEditTest, setIsEditTest] = useState(false)
  const handleEditTest = (status) => {
    setIsEditTest(status)
  }
  return (
    <div>
      {isEditTest ? (
        <div>
          <InputTest
            type="EDIT"
            dataTest={props.dataTestDetail}
            onModalCreateTest={handleEditTest}
            setDataTest={props.setDataTestDetail}
          />
        </div>
      ) : (
        <div>
          <div className="w-full absolute flex justify-end">
            <Button
              className="mr-20"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {handleEditTest(true)}}
            >
              {t('exercise.edit')}
            </Button>
          </div>
          <div className="p-10">
            <InfoTest dataTestDetail={props.dataTestDetail} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailTest;
